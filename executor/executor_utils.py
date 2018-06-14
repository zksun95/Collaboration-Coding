import docker
from docker.errors import *
import uuid
import os
import shutil


client = docker.from_env()

IMAGE = 'zksun95/executor_0.0.1'
BUILD_DIR = "%s\\tmp\\" % os.path.dirname(os.path.realpath(__file__))

FILE_NAMES = {
    "java" : "Example.java",
    'python' : 'example.py'
}

BINARY_NAMES = {
    "java" : "Example",
    'python' : 'example.py'
}

BUILD_COMMANDS = {
    "java" : "javac",
    "python" : "python"
}

EXECUTE_COMMANDS = {
    "java" : "java",
    "python" : "python"
}


def load_image():
    try:
        client.images.get(IMAGE)
    except ImageNotFound:
        print("Loading image from docker hub...")
        client.images.pull(IMAGE)
    except APIError:
        print("Cannot reach docker hub, try again.")
        return
    print("Image (%s) loaded." % (IMAGE))


def make_dir(dir):
    try:
        os.mkdir(dir)
        print("tmp dir (%s) created." % (dir))
    except OSError:
        print("tmp dir (%s) existed." % (dir))


def build_run(code, language):
    res = {
        "build": None,
        "run": None
    }
    code_pos = uuid.uuid4()
    code_dir = "%s\\%s" % (BUILD_DIR, code_pos)
    code_dir_docker = "/tmp_run/%s" % (code_pos)
    make_dir(code_dir)

    with open("%s\\%s" % (code_dir, FILE_NAMES[language]), 'w') as source_code:
        source_code.write(code)

    try:
        client.containers.run(
            image=IMAGE,
            command="%s %s" % (BUILD_COMMANDS[language], FILE_NAMES[language]),
            volumes={code_dir: {'bind': code_dir_docker, 'mode': 'rw'}},
            working_dir=code_dir_docker
        )
        print ("Source built.")
        res["build"] = "OK"
    except ContainerError as e:
        print ("Build failed.")
        res["build"] = e.stderr
        shutil.rmtree(code_dir)
        return res

    try:
        log = client.containers.run(
            image=IMAGE,
            command="%s %s" % (EXECUTE_COMMANDS[language], BINARY_NAMES[language]),
            volumes={code_dir: {'bind': code_dir_docker, 'mode': 'rw'}},
            working_dir=code_dir_docker)
        print ("Executed.")
        print(str(log, 'utf-8'))
        print(str(log, 'utf-8'))
        res["run"] = str(log, 'utf-8')
    except ContainerError as e:
        print ("Execution failed.")
        res["run"] = e.stderr
        shutil.rmtree(code_dir)
        return res

    shutil.rmtree(code_dir)
    return res







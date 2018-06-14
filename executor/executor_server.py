from flask import Flask, request, jsonify
from executor_utils import build_run, load_image
import json

app = Flask(__name__)

# @app.route("/")
# def hell0():
#     return "hello?"

@app.route("/build_and_run", methods=["POST"])
def build_and_run():
    data = json.loads(request.data)
    if "code" not in data or "language" not in data:
        return "missing code or language"
    code = data["code"]
    language = data["language"]
    print(code, language)

    res = build_run(code, language)

    print(res)

    return jsonify(res)


if __name__ == "__main__":
    load_image()
    app.run(debug = True)

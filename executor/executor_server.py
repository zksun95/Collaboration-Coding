from flask import Flask, request, jsonify
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

    return jsonify({"nothing": "here"})


if __name__ == "__main__":
    app.run(debug = True)

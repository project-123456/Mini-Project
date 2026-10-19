from flask import Flask, request, jsonify
import joblib
import librosa
import numpy as np
import os


from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "ml_models", "emotion_model.pkl")
ENCODER_PATH = os.path.join(os.path.dirname(__file__), "..", "ml_models", "label_encoder.pkl")

model = joblib.load(MODEL_PATH)
label_encoder = joblib.load(ENCODER_PATH)


# Feature extraction
def extract_features(file_path):
    audio, sample_rate = librosa.load(file_path, res_type="kaiser_fast")

    mfcc = librosa.feature.mfcc(
        y=audio,
        sr=sample_rate,
        n_mfcc=40
    )

    features = np.mean(mfcc.T, axis=0)

    return features


@app.route("/predict", methods=["POST"])
def predict():

    if "file" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    temp_path = "temp_audio.wav"
    file.save(temp_path)

    try:
        features = extract_features(temp_path)

        features = features.reshape(1, -1)

        prediction = model.predict(features)

        emotion = label_encoder.inverse_transform(prediction)[0]

        return jsonify({
            "emotion": emotion
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Emotion ML API is running"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
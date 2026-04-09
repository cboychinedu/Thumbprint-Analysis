# matcher.py
import numpy as np
from tensorflow.keras.models import load_model
from utils import preprocess

model = load_model("embedding_model.h5", compile=False)
database = np.load("fingerprint_db.npy", allow_pickle=True).item()

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def identify_fingerprint(path, threshold=0.6):
    img = preprocess(path)
    img = np.expand_dims(img, axis=0)

    embedding = model.predict(img)[0]

    best_match = "Unknown"
    best_score = -1

    for label, db_emb in database.items():
        score = cosine_similarity(embedding, db_emb)

        if score > best_score:
            best_score = score
            best_match = label

    if best_score < threshold:
        return "Unknown"

    return best_match
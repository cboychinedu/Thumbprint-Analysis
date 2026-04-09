# build_database.py
import numpy as np
from tensorflow.keras.models import load_model
from utils import load_images

model = load_model("embedding_model.h5", compile=False)

images, labels = load_images("data")

embeddings = model.predict(images)

database = {}

for emb, label in zip(embeddings, labels):
    if label not in database:
        database[label] = []
    database[label].append(emb)

# Average embeddings per person
for label in database:
    database[label] = np.mean(database[label], axis=0)

np.save("fingerprint_db.npy", database)

print("Database created ✅")
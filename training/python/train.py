# train.py
import tensorflow as tf
from model import build_siamese_model
from utils import load_images, create_pairs

def contrastive_loss(y_true, y_pred):
    margin = 1
    return tf.reduce_mean(
        y_true * tf.square(y_pred) +
        (1 - y_true) * tf.square(tf.maximum(margin - y_pred, 0))
    )

# Load data
images, labels = load_images("data")

pairs, targets = create_pairs(images, labels)

X1 = pairs[:,0]
X2 = pairs[:,1]

# Build model
model = build_siamese_model()

model.compile(
    optimizer='adam',
    loss=contrastive_loss
)

# Train
model.fit(
    [X1, X2],
    targets,
    batch_size=16,
    epochs=10
)

# Save full model
model.save("siamese_model.h5")

# Save embedding model separately
embedding_model = model.get_layer("embedding_model")
embedding_model.save("embedding_model.h5")

print("Training complete ✅")
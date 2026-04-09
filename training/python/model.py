# model.py
import tensorflow as tf
from tensorflow.keras import layers, Model

def build_embedding_model():
    input = layers.Input((128, 128, 1), name="input")

    x = layers.Conv2D(32, (3,3), activation='relu')(input)
    x = layers.MaxPooling2D()(x)

    x = layers.Conv2D(64, (3,3), activation='relu')(x)
    x = layers.MaxPooling2D()(x)

    x = layers.Conv2D(128, (3,3), activation='relu')(x)
    x = layers.Flatten()(x)

    x = layers.Dense(128, activation='relu')(x)
    x = layers.Lambda(lambda x: tf.math.l2_normalize(x, axis=1))(x)

    return Model(input, x, name="embedding_model")


def build_siamese_model():
    embedding = build_embedding_model()

    input_a = layers.Input((128,128,1))
    input_b = layers.Input((128,128,1))

    emb_a = embedding(input_a)
    emb_b = embedding(input_b)

    # Euclidean distance
    distance = tf.sqrt(tf.reduce_sum(tf.square(emb_a - emb_b), axis=1, keepdims=True))

    return Model([input_a, input_b], distance)
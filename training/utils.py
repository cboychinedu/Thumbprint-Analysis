# utils.py
import os
import cv2
import numpy as np

def preprocess(path):
    img = cv2.imread(path, 0)
    img = cv2.resize(img, (128,128))
    img = cv2.equalizeHist(img)
    img = img / 255.0
    return np.expand_dims(img, axis=-1)

def load_images(data_dir):
    images = []
    labels = []

    for file in os.listdir(data_dir):
        if file.endswith(".png"):
            label = file.split("_")[0]
            img = preprocess(os.path.join(data_dir, file))

            images.append(img)
            labels.append(label)

    return np.array(images), np.array(labels)


def create_pairs(images, labels):
    pairs = []
    targets = []

    for i in range(len(images)):
        for j in range(i+1, len(images)):
            pairs.append([images[i], images[j]])

            if labels[i] == labels[j]:
                targets.append(1)  # same
            else:
                targets.append(0)  # different

    return np.array(pairs), np.array(targets)
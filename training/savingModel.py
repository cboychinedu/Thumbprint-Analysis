#!/usr/bin/env python3 

import gridfs
import io

class MachineLearningDB: 
    def __init__(self):
        pass

    def saveModel(self, model_bytes, model_name, version="1.0"):
        """
        Saves a binary ML model to MongoDB using GridFS.
        :param model_bytes: The actual model file in bytes
        :param model_name: Name of the model (e.g., 'thumb_classifier')
        """
        if self.db is None:
            print("[ERROR]: Database connection not available.")
            return None

        # Initialize GridFS on the current database connection
        fs = gridfs.GridFS(self.db, collection="models")

        try:
            # Store the file and add metadata
            file_id = fs.put(
                model_bytes, 
                filename=model_name, 
                metadata={
                    "version": version,
                    "framework": "tensorflow/keras",
                    "type": "biometric_weights"
                }
            )
            print(f"[INFO]: Model '{model_name}' saved successfully with ID: {file_id}")
            return file_id
        except Exception as e:
            print(f"[ERROR]: Failed to save model: {str(e)}")
            return None

    def loadModel(self, model_name):
        """ Retrieves the latest model binary from GridFS """
        fs = gridfs.GridFS(self.db, collection="models")
        try:
            file_data = fs.find_one({"filename": model_name}, sort=[("uploadDate", -1)])
            if file_data:
                return file_data.read()
            return None
        except Exception as e:
            print(f"[ERROR]: Failed to load model: {str(e)}")
            return None
        
        
        
# Example 
from database.database import db

# Example: Saving a saved model file (.h5)
model_path = "path/to/your/thumbprint_model.h5"

with open(model_path, "rb") as f:
    model_binary = f.read()
    # Because db is an instance of MongoDB, which inherits MachineLearningDB,
    # it now has the .saveModel method.
    db.saveModel(model_binary, "thumbprint_v1")
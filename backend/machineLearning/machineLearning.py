#!/usr/bin/env python3 

# Importing the necessary modules 
import time 
import os 
import joblib 
import numpy as np 
import tensorflow as tf 

# Setting the path to the root directory 
rootDir = "machineLearning/models" 

# Creating a class for handling the machine learning operations 
class MachineLearning: 
    # Initializing the class 
    def __init__(self):         
        # Getting the model path 
        self.modelPath = os.path.sep.join([rootDir, "model.joblib"])
        
        # Loading the model using try except block 
        try: 
            # Loading the bundle 
            self.bundle = joblib.load(self.modelPath)
            
            # Load the model 
            self.model = self.bundle["model"]
            
            # Load the model weights 
            self.model.set_weights(self.bundle["weights"])
        
        # Except Error as exception 
        except Exception as error: 
            # Display the error message 
            print(f"Error occured: {error}")
            
            # Raise the error 
            raise Exception(error); 
        
    # Creating a method for performing the inference 
    def performInference(self, imagePath): 
        # Start the timer 
        startTime = time.perf_counter() 
        
        # Preprocess the image 
        image = tf.keras.utils.load_img(imagePath, color_mode="grayscale", target_size=self.bundle["imageSize"])
        imageArray = tf.keras.utils.img_to_array(image)
        imageArray = tf.expand_dims(imageArray, 0)
        
        # Predict the class 
        predictions = self.model.predict(imageArray) 
        score = tf.nn.softmax(predictions[0])
        
        # Getting the result 
        result = self.bundle["classNames"][np.argmax(score)]
        confidence = round(100 * np.max(score), 2)
        
        # End the timer 
        endTime = time.perf_counter() 
        
        # Calculate the latency in seconds
        latencySeconds = endTime - startTime
        latencySeconds = round(latencySeconds, 2) 
        
        # Return the result 
        return (result, confidence, latencySeconds)
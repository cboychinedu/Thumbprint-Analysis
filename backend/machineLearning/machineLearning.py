#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import cv2
import json 
import pickle 

# Creating a class for handling the machine learning operations 
class MachineLearning: 
    # Initializing the class 
    def __init__(self, imageData): 
        self.imageData = imageData
        
    # Creating a method for performing the inference 
    def performInference(self, modelType="default"): 
        pass 
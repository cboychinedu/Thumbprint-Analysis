#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import json 

# Creating a class for handling the machine learning database operations 
class MachineLearningDB: 
    # Initialize the class 
    def __init__(self):
        pass
    
    # Creating a method for saving the thumb print data 
    def saveThumbprintAnalysis(self, collectionName, data): 
        # Getting the collection object 
        collection = self.db[collectionName]
        
        # Saving the collection data 
        result = collection.insert_one(data)
        
        # Returning the result 
        return result.acknowledged 
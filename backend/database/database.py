#!/usr/bin/env python3 

# Importing the necessary modules 
import os
import json 
from pymongo import MongoClient

# Creating a class for handling the database connection 
class MongoDB: 
    # Initializing the class 
    def __init__(self): 
        # Creating a variable for the client, and db
        uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
        dbName = os.getenv("MONGODB_DB_NAME", "thumbPrintAnalysis")
        
        # Using try catch block to connect to the database 
        try:
            # Getting the user's database name, and uri 
            self.client = MongoClient(uri)
            self.db = self.client[dbName]
            
            # Displaying the status message 
            # print(f"[INFO]: Connected to the MongoDB database.")
        
        # Catch the error and log it to the console 
        except Exception as error: 
            # Display the error 
            print(f"[ERROR]: Error connecting to the database. {str(error)}")
            
            # Set the cline, and db as None 
            self.client = None
            self.db = None
        
    # Creating a method for getting the users' information 
    def getUsersInformation(self, collectionName, email): 
        # Creating the mongodb query 
        query = { 'email': email }
        
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Find one data by the specified email address 
        userData = collection.find_one(query, {
            "_id": 1, 
            "fullname": 1, 
            "email": 1, 
            "password": 1
        })
        
        # if the returned data type is None type, execute the block 
        # of code below 
        if userData == None: 
            # Return the None type as a data 
            return None; 
        
        # Convert the MongoDB documents into a json object 
        jsonData = json.dumps(dict(userData), default=str)
        
        # Return the json object 
        return jsonData; 
    
    # Creating a method for saving the user's information 
    def saveUsersInformation(self, collectionName, data): 
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Saving the collection data 
        result = collection.insert_one(data) 
        
        # Returning the result 
        return result.acknowledged
    
    # Creating a method for saving the thumb print data 
    def saveThumbprintAnalysis(self, collectionName, data): 
        # Getting the collection object 
        collection = self.db[collectionName]
        
        # Saving the collection data 
        result = collection.insert_one(data)
        
        # Returning the result 
        return result.acknowledged 
    
    # Creating a method for extracting the history based on the email given 
    def getUsersAnalyzedHistory(self, collectionName, email):
        # Creating the mongodb query 
        query = { 'email': email } 
        
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Find all the analyzed data for this specific user 
        cursor = collection.find(query, {
            "_id": 1, 
            "email": 1, 
            "owner": 1, 
            "status": 1, 
            "confidence": 1, 
            "latency": 1, 
            "encodedImage": 1, 
            "timestamp": 1,
            "type": 1 
        })
        
        # Convert the history list into a list 
        historyList = list(cursor) 
        
        # if the returned data type is None type, execute the block of code below 
        if not historyList: 
            # Return None 
            return None; 
        
        # Convert the MongoDB documents into a json object 
        jsonData = json.dumps(historyList, default=str)
        
        # Return the json object 
        return jsonData; 


# Creating a shared instance of the MongoDB class 
db = MongoDB() 


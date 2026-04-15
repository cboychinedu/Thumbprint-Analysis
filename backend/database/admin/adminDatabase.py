#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import json 
from pymongo import MongoClient 
from bson.objectid import ObjectId 

# Creating a class for handling the database connection 
class AdminMongoDB: 
    # Initializing the class 
    def __init__(self):
        # Creating a variable for the clinet and db 
        uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
        dbName = os.getenv("MONGODB_DB_NAME", "thumbPrintAnalysis")
        
        # Using try catch block to connect to the database 
        try: 
            # Getting the admin's database name, and uri 
            self.clinet = MongoClient(uri)
            self.db = self.clinet[dbName]
        
        # Catch the error and log it to the console 
        except Exception as error: 
            print(f"[ERROR]: Error connecting to the database. {str(error)}")
            
            # Set the client, and db name as None 
            self.clinet = None 
            self.db = None 
    
    # Creating a method for saving the admin user's information 
    def saveUsersInformation(self, collectionName, data): 
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Saving the collection data 
        result = collection.insert_one(data) 
        
        # Returning the result 
        return result.acknowledged
    
    # Creating a method for getting the admin's user information 
    def getAdminUserInformation(self, collectionName, email): 
        # Creating the mongodb query 
        query = { 'email': email }
        
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Find one data by the specified email address 
        adminData = collection.find_one(query, {
            "_id": 1, 
            "fullname": 1, 
            "email": 1,
            "clearanceStatus": 1, 
            "password": 1
        })
        
        # if the returned data type is None type, execute the block 
        # of code below 
        if adminData == None: 
            # Return the None type as a data 
            return None; 
        
        # Convert the MongoDB documents into a json object 
        adminData = json.dumps(dict(adminData), default=str)
        
        # Return the json object 
        return adminData; 
    
    
# Creating a shared instance of the Admin MongoDb class 
db = AdminMongoDB() 
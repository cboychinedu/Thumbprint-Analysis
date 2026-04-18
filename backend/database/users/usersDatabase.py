#!/usr/bin/env python3 

# Importing the necessary modules 
import os
import json 
from pymongo import MongoClient
from bson.objectid import ObjectId
from database.users.downloadUsersData import HandleDownloadAnalyzedHistory

# Creating a class for handling the database connection 
class MongoDB(HandleDownloadAnalyzedHistory): 
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
            
            # Set the clinet, and db as None 
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
            "password": 1, 
            "dateCreated": 1
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
            "predictedResult": 1, 
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
    
    # Creating a method updating the users password 
    def updateUsersPassword(self, email, newPassword, collectionName="users"):
        # Create the query 
        query = { "email": email }
        
        # Getting the collection object
        collection = self.db[collectionName]
        
        # Changing the users password 
        result = collection.update_one(
            query, 
            update={"$set": {"password": newPassword}}
        )
        
        # if the deleted count is greater then zero(0) 
        # Execute the block of code below 
        if result.modified_count > 0: 
            # Displaying the status 
            print("[INFO]: Password changed successfully!")
            
            # Returning the status report 
            return {
                "status": "success", 
                "message": "Password changed!", 
                "statusCode": 200
            }
        
        # Else if the deleted count is equal to zero, or less than 
        # Execute the block of code below 
        else: 
            # Display the error report 
            print("[INFO]: Update password failed: No matching record found!")
            
            # Return the error message 
            return None; 
        
    
    # Creating a method for deleting the user's analyzed history data 
    def deleteUsersAnalyzedHistory(self, _id, email, collectionName="thumbprintAnalysis"):
        # Checking if the user is first registered on our database with the token email value 
        usersData = self.getUsersInformation(collectionName="users", email=email)
        
        # if the user's data does not exists
        if not usersData: 
            # Return None 
            return None; 
        
        # else if the user's data was found on the database, execute 
        # the following block of code below 
        else: 
            # Create the mongodb query 
            query = { "email": email, "_id": ObjectId(_id) }
            
            # Getting the collection name 
            collection = self.db[collectionName]
            
            # Deleting the history data 
            result = collection.delete_one(query)
            
            
            # If the deleted count is greater than zero(0), 
            # Execute the block of code below 
            if result.deleted_count > 0: 
                # Displaying the status 
                print("[INFO]: Record successfully deleted!")
                
                # Returning the status report 
                return { 
                    "status": "success", 
                    "message": "History deleted!", 
                    "statusCode": 200 
                }
            
            # Else if the deleted count is equal to zero, or less than
            # Execute the block of code below 
            else: 
                # Display the error report 
                print("[INFO]: Delete failed: No matching record found!")
                
                # Return the error message 
                return None 
            

# Creating a shared instance of the MongoDB class 
db = MongoDB() 


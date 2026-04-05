#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import jwt 
import json
import bcrypt 
import datetime 
from database.database import db
from flask import jsonify, request, Blueprint 

# Getting the secret key 
secretKey = os.getenv("SECRET_KEY")

# Creating the login route blueprint 
login = Blueprint("login", __name__) 

# Creating the root route for the login page 
@login.route("/", methods=["POST"])
def loginPage():
    # Using try, except block to connect to the database 
    try: 
        # Getting the user login data 
        userData = request.get_json() 
        
        # Getting the individal data 
        email = userData["email"]
        password = userData["password"]
        
        # Checking if the user is already registered on the database 
        result = db.getUsersInformation("users", email=email)
        
        # if the result is None
        if result is None: 
            # Create a response message 
            responseMessage = {
                "message": "Invalid email or password!", 
                "status": "error", 
                "statusCode": 401
            }
            
            # Sending the response message 
            return jsonify(responseMessage)
        
        # Else if the result exists, exist the block of code 
        else: 
            # Converting the result into a json object 
            result = json.loads(result)
            
            # Getting the password 
            storedPasswordHash = result["password"]
            
            # if the hash is stored as the string "b"$2b$05...'", strip the wrappers 
            if storedPasswordHash.startswith("b") and storedPasswordHash.endswith("'"): 
                storedPasswordHash = storedPasswordHash[2:-1]
                
            # Convert the password into bytes formats 
            password = password.encode("utf-8")
            hashedPassword = storedPasswordHash.encode("utf-8")
            
            # Verifying the password hash 
            condition = bcrypt.checkpw(password, hashedPassword)
            
            # Checking the condition if the password verification is correct 
            if (condition): 
                # Generate a token for the user and send it back to the client 
                payload = {
                    "email": email, 
                    "fullname": result["fullname"], 
                    "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=31),
                    "isLoggedIn": True 
                }
                
                # Encoding the payload 
                encodedJwt = jwt.encode(
                    payload, 
                    secretKey, 
                    algorithm="HS256"
                )
                
                # Building the response data 
                responseData = {
                    "status": "success", 
                    "message": "User logged in successfully!", 
                    "token": encodedJwt
                }
                
                # Sending the response data 
                return jsonify(responseData); 
            
            # Else if the user password is incorrect, execute the block of 
            # code below 
            else: 
                # Create the response data 
                responseData = {
                    "status": "error", 
                    "message": "Invalid email or password!", 
                    "statusCode": 401
                }
                
                # Sending the response message 
                return jsonify(responseData)
            
            
    # Except exception as error 
    except Exception as error: 
        # Execute this block of code if there was an error connection 
        # to the database 
        print(f"[ERROR]: Error connecting to the database. {error}")
        
        # Creating the error message 
        errorMessage = {
            "message": "Error connecting to the database!", 
            "status": "error", 
            "statusCode": 500
        }
        
        # Returning the error message 
        return jsonify(errorMessage)
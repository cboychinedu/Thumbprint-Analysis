#!/usr/bin/env python3 

# Importing the necessary modules  
import bcrypt
from datetime import datetime
from database.users.usersDatabase import db
from flask import jsonify, request, Blueprint

# Creating the register route blueprint 
register = Blueprint("register", __name__)

# Creating the route for the register home page 
@register.route("/", methods=["POST"])
def registerPage(): 
    # Using try except block to connect to the database 
    try: 
        # Getting the user's data 
        userData = request.get_json() 
        
        # Getting the individual user's data 
        fullname = userData["fullname"]
        email = userData["email"]
        password = userData["password"]
        
        # Checking if the user is already registered on the database 
        result = db.getUsersInformation("users", email=email)
        # print(result) 
        
        # if the result is None 
        if result is None: 
            # if the result is None, which means the user with the s
            # Specified email is not registered on the database 
            # Encrypt the password 
            password = bytes(password.encode('utf-8'))
            passwordHash = bcrypt.hashpw(password, bcrypt.gensalt(5))
            
            # Getting the date 
            fullDate = datetime.now() 
            fullDate = fullDate.strftime("%Y-%m-%d %I:%M:%S %p")
            
            # Saving the user's registered data on the database 
            registeredData = {
                "email": email, 
                "fullname": fullname, 
                "password": passwordHash, 
                "date": fullDate
            }
            
            # Saving the registerd user's data 
            result = db.saveUsersInformation("users", registeredData)
            
            # >>> Treat as Urgent 
            print(result) 
            
            # Creating the success message 
            responseMessage = {
                "message": "User registered.", 
                "status": "success", 
                "statusCode": 200
            }
            
            # Return the response message 
            return jsonify(responseMessage); 
        
        # Else if the user is already registered on the database 
        else: 
            # Return the error response 
            responseMessage:dict = {
                "message": "User already exists.", 
                "status": "error", 
                "statusCode": 404 
            }
            
            # Returning the json object
            return jsonify(responseMessage)
    
    # Except exception as error 
    except Exception as error: 
        # Execute this block of code if there was an error connecting 
        # to the database 
        print(f"[ERROR]: Error connecting to the database. {error}")
        
        # Creating the error message 
        errorMessage = {
            "message": "Error connecting to the database.", 
            "status": "error", 
            "statusCode": 500
        }
        
        # Returning the error message 
        return jsonify(errorMessage)
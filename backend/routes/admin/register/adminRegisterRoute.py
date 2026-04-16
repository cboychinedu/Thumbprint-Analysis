#!/usr/bin/env python3 

# Importing the necessary modules 
import bcrypt 
from datetime import datetime 
from database.admin.adminDatabase import db 
from flask import jsonify, request, Blueprint
from crypt.crypt import Cryptography

# Creating an instance of the Cryptography class 
cryptpo = Cryptography() 

# Creating the admin register route blueprint 
adminRegister = Blueprint("adminRegister", __name__)

# Building a simple post route 
@adminRegister.route("/", methods=["POST"])
def registerAdmin(): 
    # Using try catch block to register the admin 
    try: 
        # Getting the admin user data 
        adminData = request.get_json() 
        
        # Getting the individual admin data 
        email = adminData["email"]
        keyCode = adminData["keyCode"]
        password = adminData["password"]
        
        # Checking if the user is registered on the admin database 
        adminData = db.getAdminUsersInformation(
            collectionName="admin", 
            email=email
        )
        
        # if the admin data exists 
        if (adminData): 
            # Execute the block of code below 
            responseMessage = {
                "message": "User already exists!", 
                "status": "info", 
                "statusCode": 400
            }
            
            # Sending the response message 
            return jsonify(responseMessage) 
        
        # Else if the admin data do not exit on the database, 
        # Execute the block of code below 
        else:
            # Decode the key code 
            decryptedData = cryptpo.decryptClearanceCode(clearanceCode=keyCode)
            
            # Checking the results of the decrypted data 
            if (decryptedData.get("status") == "success"): 
                # Hashing the password 
                password = bytes(password.encode("utf-8"))
                passwordHash = bcrypt.hashpw(password, bcrypt.gensalt(5))
                
                # Getting the date 
                fullDate = datetime.now() 
                fullDate = fullDate.strftime("%Y-%m-%d %I:%M:%S %p")
                
                # Saving the admin user registered data on the database 
                adminRegisteredData = {
                    "createdAt": fullDate, 
                    "email": email, 
                    "password": passwordHash, 
                    "clearanceLevel": decryptedData["clearanceData"]["level"], 
                    "clearanceNumber": decryptedData["clearanceData"]["number"]
                }
                
                # Saving the data on the database 
                results = db.saveAdminUsersInformation(
                    collectionName="admin", 
                    data=adminRegisteredData
                )
                
                # Checking if the database is saved 
                if results:
                    # Build the response message 
                    responseMessage = {
                        "status": "success", 
                        "message": "Admin registered on the database!", 
                        "statusCode": 200
                    }
                    
                    # Sending the response message 
                    return jsonify(responseMessage)
                
                # Else if the result returned a None type or a False value, 
                # this means that the data was not saved on the database 
                else: 
                    # Build the error message 
                    errorMessage = {
                        "status": "error", 
                        "message": "Error saving the data on the database!", 
                        "statusCode": 404
                    }
                    
                    # Sending the error message 
                    return jsonify(errorMessage)
                
                
            # Else if the status was an info 
            elif (decryptedData.get("status") == "info"): 
                # Return the result of the returned object 
                return jsonify(decryptedData)
            
            # Else if the status was an error 
            else: 
                # Return the error message 
                return jsonify(decryptedData) 
            
    # Except there was an error with the request body, execute the 
    # block of code below 
    except Exception as error: 
        # Generate the error response 
        errorResponse = {
            "status": "error", 
            "message": str(error), 
            "statusCode": 505
        }
        
        # Sending the error message 
        return jsonify(errorResponse)
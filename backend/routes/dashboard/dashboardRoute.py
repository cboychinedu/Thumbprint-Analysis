#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import jwt 
import json
import base64
from datetime import datetime
from database.database import db
from werkzeug.utils import secure_filename
from flask import jsonify, request, Blueprint
from machineLearning.machineLearning import MachineLearning

# Creating a directory to store the thumbprint images 
thumbPrintDir = "thumbPrintImages"

# Getting the secret key 
secretKey = os.getenv("SECRET_KEY")

# Creating the instance of the machine learning class 
mlClass = MachineLearning()

# Creating the dashboard blueprint route 
dashboard = Blueprint("dashboard", __name__)

# Creating the route for the dashboard page 
@dashboard.route("/", methods=["POST"])
def analyseThumbPrint():
    # Using try except block 
    try:
        # Getting the headers for the user cookie 
        userToken = request.headers.get("x-auth-token")
        decodedToken = jwt.decode(userToken, secretKey, algorithms=["HS256"], options={"verify_signature": True})
        
        # Get the user email address 
        email = decodedToken["email"]
        
        # If no file is part of the request, return an error message 
        if 'thumbprint' not in request.files: 
            # Return the error message 
            return jsonify({
                "message": "No file found", 
                "status": "error", 
                "statusCode": 400
            }) 
            
        # if the file is found, get the file object 
        thumbprint = request.files['thumbprint']
        
        # if the filename is empty, return an error message 
        if thumbprint.filename == "": 
            return jsonify({
                "message": "No file selected", 
                "status": "error", 
                "statusCode": 400
            })
            
        # if the file name was provided 
        if thumbprint:
            # Sanitize the file name 
            filename = secure_filename(thumbprint.filename)
            
            # Append timestamp to make the filename unique 
            uniqueFilename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
            
            # Create a full file path in the temp directory 
            filePath = os.path.join(thumbPrintDir, uniqueFilename)
            
            # Save the file 
            thumbprint.save(filePath)
            
            # Loading the ml model and perform inference 
            result, confidence, latency = mlClass.performInference(filePath)
            
            # Encode the process image as a base64 string 
            with open(filePath, "rb") as imageFile: 
                # Encode the image 
                encodedImage = base64.b64encode(imageFile.read()).decode('utf-8')
                
            # Get the current time 
            now = datetime.now() 
            
            # Format the time 
            formattedTime = now.strftime("%Y-%m-%d %I:%M:%S %p")
                
            # Creating the database data
            databaseData = {
                "email": email, 
                "owner": str(result),
                "status": "success", 
                "confidence": str(confidence), 
                "latency": str(latency), 
                "encodedImage": f"data:image/jpeg;base64,{encodedImage}", 
                "fullname": uniqueFilename,
                "timestamp": formattedTime,
                "type": "image"
            }
            
            # Saving the analysis into a database 
            db.saveThumbprintAnalysis('thumbprintAnalysis', databaseData)
            
            # Building the response message 
            responseMessage = {
                "message": "Thumbprint detected!",
                "status": "success", 
                "owner": str(result), 
                "confidence": str(confidence), 
                "latency": str(latency), 
                "timestamp": formattedTime
            }
            
            # Returning the message 
            return jsonify(responseMessage)
        
        # Else if the file name was not provided 
        else: 
            # Build the error response 
            responseMessage = {
                "message": "File not found", 
                "status": "error", 
                "owner": "Error finding thumb owner"
            }
            
            # Sending the error message 
            return jsonify(responseMessage)
        
    # Except exception as error 
    except Exception as error: 
        # Display the error message 
        print(f"Error: {error}")
        
        # Build the error response 
        errorResponse = {
            "message": str(error), 
            "status": "error", 
            "owner": "Error finding thumb owner", 
            "statusCode": 505
        }
        
        # Sending back the error response 
        return jsonify(errorResponse)
    
# Creating the profile page 
@dashboard.route("/profile", methods=["GET"])
def getUserProfile(): 
    # Using try except block 
    try: 
        # Getting the user's token from the headers 
        userToken = request.headers.get("x-auth-token")
        decodedToken = jwt.decode(userToken, secretKey, algorithms=["HS256"])
        email = decodedToken["email"]
        
        # Getting the users information from the database 
        userData = db.getUsersInformation("users", email)
        
        # if the user is present, execute the block of code below 
        if userData: 
            # Convert the user's data into a json object 
            userDict = json.loads(userData)
            
            # Remove the password before sending to the frontend 
            userDict.pop('password', None)
            
            # Building the response message 
            responseMessage = {
                "status": "success", 
                "user": userDict, 
                "statusCode": 200
            }
            
            # Sending the message 
            return jsonify(responseMessage) 
        
        # else 
        else: 
            # if the user data is not present 
            # Build a response message 
            responseMessage = {
                "status": "error", 
                "message": "User not found!", 
                "statusCode": 500
            }
            
            # Sending the error message 
            return jsonify(responseMessage)
        
    # Exception as error 
    except Exception as error: 
        # Building the error response 
        errorResponse = {
            "message": str(error), 
            "status": "error", 
            "statusCode": 500
        }
        
        # Sending the error message 
        return jsonify(errorResponse)
    
# Creating a route for getting the users history 
@dashboard.route("/history", methods=["GET"])
def getThumbprintHistory(): 
    # Using try catch block to get the user's request 
    try: 
        # Authenticate the user via token 
        userToken = request.headers.get("x-auth-token")
        
        # if the user token is not present 
        if not userToken: 
            # Return the following json object below 
            return jsonify({
                "message": "Unauthorized", 
                "status": "error", 
                "statusCode": 401 
            })
            
        # Decode the token 
        decodedToken = jwt.decode(userToken, secretKey, algorithms=["HS256"])
        email = decodedToken["email"]
        
        # Getting the users history 
        usersHistory = db.getUsersAnalyzedHistory("thumbprintAnalysis", email)
        
        # Fetch the history from the database 
        return jsonify({
            "status": "success", 
            "history": usersHistory, 
            "statusCode": 200
        })
    
    # Except exception as error 
    except Exception as error: 
        # Display the history error 
        print(f"History Error: ", {error})
        
        # Return the error message
        return jsonify({ "message": str(error), "status": "error", "statusCode": 500 }) 
    
# Creating a route for deleting the analysis 
@dashboard.route("/delete", methods=["DELETE"])
def deleteAnalysis(): 
    # Using try catch block to get the user's request 
    try: 
        # Authenticate the user via token 
        userToken = request.headers.get("x-auth-token")
        
        # if the user token is not present 
        if not userToken: 
            # Return the following json object below 
            return jsonify({
                "message": "Unauthorized", 
                "status": "error", 
                "statusCode": 401
            })
            
        # Decode the token 
        decodedToken = jwt.decode(userToken, secretKey, algorithms=["HS256"])
        email = decodedToken["email"]
        
        # Getting the user key/_id value 
        userData = request.get_json()
        _id = userData["_id"]
        
        # Deleting the user's analyzed history 
        result = db.deleteUsersAnalyzedHistory(_id, email, collectionName="thumbprintAnalysis")
        
        # if the result is None, execute the block of code below 
        if not result: 
            # If the result returned a None type data type, execute the block 
            # of code below 
            # Generate the error response 
            errorResponse = { 
                "status": "error", 
                "message": "Record not found or access denied!", 
                "statusCode": 404
            }
            
            # Sending the error response 
            return jsonify(errorResponse)
        
        # if the result returned a success report
        else: 
            # Send the success report back to the client
            return jsonify(result)
    
    # Building the error message 
    except Exception as error:
        # Building the error response 
        errorResponse = {
            "status": "error", 
            "message": str(error), 
            "statusCode": 500
        }
        
        # Sending the error message 
        return jsonify(errorResponse)
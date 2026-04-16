#!/usr/bin/env python3 

# Importing the necessary modules 
from flask import Blueprint, jsonify

# Define the login blueprint 
adminLogin = Blueprint("adminLogin", __name__)

# Building a simple get route 
@adminLogin.route("/", methods=["GET"])
def Home(): 
    return jsonify({ "Message": "Admin Home Login!"})
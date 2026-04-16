#!/usr/bin/env python3 

# Importing the necessary modules 
from flask import jsonify, request, Blueprint 

# Define the settings blueprint 
adminSettings = Blueprint("adminSettings", __name__)

# Building the home route for the settings 
@adminSettings.route("/", methods=["POST"])
def settings(): 
    pass 
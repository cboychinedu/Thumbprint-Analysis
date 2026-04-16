#!/usr/bin/env python3 

# Importing the necessary modules 
import bcrypt 
from datetime import datetime 
from database.admin.adminDatabase import db 
from flask import jsonify, request, Blueprint

# Creating the admin register route blueprint 
adminRegister = Blueprint("adminRegister", __name__)

# Building a simple post route 
@adminRegister.route("/", methods=["POST"])
def registerAdmin(): 
    pass 
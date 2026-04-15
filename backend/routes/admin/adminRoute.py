#!/usr/bin/env python3 

# Importing the necessary modules 
from .login.adminLoginRoute import adminLogin
from flask import jsonify, request, Blueprint

# Creating the admin blueprint route 
admin = Blueprint("admin", __name__)

# Register the login blueprint 
admin.register_blueprint(adminLogin, url_prefix="/login")
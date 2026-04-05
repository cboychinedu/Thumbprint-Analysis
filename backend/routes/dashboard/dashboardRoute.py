#!/usr/bin/env python3 

# Importing the necessary modules 
from database.database import db
from flask import jsonify, request, Blueprint

# Creating the dashboard blueprint route 
dashboard = Blueprint("dashboard", __name__)

# Creating the route for the dashboard page 
@dashboard.route("/", methods=["POST"])
def dashboardPage(): 
    return jsonify({ "message": "Dashboard Page!"})
#!/usr/bin/env python3 

# Importing the necessary modules 
from flask import Blueprint
from .login.loginRoute import login
from .register.registerRoute import register
from .dashboard.dashboardRoute import dashboard

# Getting the users blueprint route 
users = Blueprint("users", __name__)

# Register the users blueprint 
users.register_blueprint(login, url_prefix="/login")
users.register_blueprint(register, url_prefix="/register")
users.register_blueprint(dashboard, url_prefix="/dashboard")
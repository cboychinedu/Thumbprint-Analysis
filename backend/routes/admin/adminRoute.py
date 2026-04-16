#!/usr/bin/env python3 

# Importing the necessary modules 
from flask import jsonify, request, Blueprint
from .login.adminLoginRoute import adminLogin
from .settings.adminSettingsRoute import adminSettings
from .register.adminRegisterRoute import adminRegister

# Creating the admin blueprint route 
admin = Blueprint("admin", __name__)

# Register the login blueprint 
admin.register_blueprint(adminLogin, url_prefix="/login")
admin.register_blueprint(adminSettings, url_prefix="/settings")
admin.register_blueprint(adminRegister, url_prefix="/register")
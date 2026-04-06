# 🖐️ ThumbPrint Analysis Backend

[![Python Version](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/flask-2.0%2B-green.svg)](https://flask.palletsprojects.com/)
[![TensorFlow](https://img.shields.io/badge/tensorflow-2.x-orange.svg)](https://www.tensorflow.org/)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

Welcome to the **ThumbPrint Analysis Backend**, a robust and scalable Flask-based server designed for fingerprint recognition and analysis. This system leverages Deep Learning (TensorFlow) to perform high-accuracy inference on thumbprint images, providing users with instant identification and confidence scores.

---

## 📖 Table of Contents
1. [Project Overview](#-project-overview)
2. [Architecture](#-architecture)
3. [Features](#-features)
4. [Prerequisites](#-prerequisites)
5. [Installation & Setup](#-installation--setup)
6. [Machine Learning Model Setup](#-machine-learning-model-setup)
7. [Running the Application](#-running-the-application)
8. [API Documentation](#-api-documentation)
9. [Directory Structure](#-directory-structure)
10. [Logging & Debugging](#-logging--debugging)
11. [License](#-license)
12. [Author](#-author)

---

## 🌟 Project Overview
The ThumbPrint Analysis Backend serves as the core engine for a biometric identification system. It handles user authentication (Registration/Login), manages thumbprint image uploads, performs real-time AI inference, and stores analysis history in a MongoDB database.

---

## 🏗 Architecture
The system is built with a modular architecture:
- **Core Server**: Flask (Python)
- **Database**: MongoDB (PyMongo)
- **ML Engine**: TensorFlow & Scikit-learn (Joblib)
- **Security**: JWT (JSON Web Tokens) & Bcrypt for password hashing
- **Logging**: Custom colored console logging and persistent file logging

---

## ✨ Features
- **Secure Authentication**: JWT-based session management and encrypted password storage.
- **AI Inference**: Real-time thumbprint matching using a pre-trained Deep Learning model.
- **History Tracking**: Automatically saves every analysis with timestamps, confidence levels, and processed images.
- **Image Processing**: Automatic sanitization and unique naming of uploaded biometric data.
- **Extensible API**: Cleanly separated routes using Flask Blueprints.

---

## 📋 Prerequisites
Before you begin, ensure you have the following installed:
- **Python 3.10+**
- **MongoDB** (Local instance or Atlas URI)
- **Git** (for cloning)

---

## ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd thumbPrintAnalysis/backend
   ```

2. **Create a Virtual Environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   SECRET_KEY=your_super_secret_key_here
   MONGODB_URI=mongodb://localhost:27017/
   MONGODB_DB_NAME=thumbPrintAnalysis
   ```

---

## 🤖 Machine Learning Model Setup

### 📦 The Model Bundle
The backend uses a specialized `model.joblib` bundle. This bundle isn't just a raw model; it contains:
- The **Neural Network Architecture** (TensorFlow/Keras).
- The **Model Weights**.
- **Metadata**: Class names, expected image sizes, and preprocessing parameters.

### 🚚 Moving the Model from Notebooks
If you have been training your model in Jupyter Notebooks or Google Colab, you need to export and move the model file to the backend:

1. Locate your exported `model.joblib` in your `notebooks/` directory.
2. Copy it to the `machineLearning/models/` directory inside the backend folder.

**Command Line (Linux/macOS):**
```bash
cp ../notebooks/model.joblib machineLearning/models/
```

**Command Line (Windows):**
```powershell
copy ..\notebooks\model.joblib machineLearning\models\
```

### 🧠 How the Model is Used
The `MachineLearning` class in `machineLearning/machineLearning.py` handles the lifecycle:
- **Initialization**: Automatically loads the Joblib bundle and reconstructs the TensorFlow model with its weights.
- **Inference**:
  - Resizes images to the required input size (e.g., grayscale).
  - Performs a forward pass through the network.
  - Applies Softmax to get probability distributions.
  - Returns the predicted class (Owner), Confidence Score, and Latency.

---

## 🚀 Running the Application

To start the backend server, execute the `app.py` script:

```bash
python3 app.py
```

- **Host**: `0.0.0.0` (Accessible on local network)
- **Port**: `3001`
- **Debug Mode**: Enabled (Auto-reloads on code changes)

Upon success, you should see a yellow-colored log in your console indicating the server is running.

---

## 🛣 API Documentation

### 🔐 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Register a new user account |
| `POST` | `/login` | Authenticate and receive a JWT |

### 📊 Dashboard & Analysis
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/dashboard/` | Upload a `.jpg`/`.png` thumbprint for analysis |
| `GET` | `/dashboard/profile` | Retrieve current user profile data |
| `GET` | `/dashboard/history` | Get a list of all previous analyses |

> **Note**: All dashboard routes require an `x-auth-token` header containing a valid JWT.

---

## 📂 Directory Structure
```text
backend/
├── app.py                  # Entry point
├── .env                    # Environment variables
├── requirements.txt        # Dependencies
├── database/               # Database connection logic
├── logFormatter/           # Custom console logging styles
├── logs/                   # Persistent log files (requests.log)
├── routes/                 # API Route Blueprints
│   ├── login/
│   ├── register/
│   └── dashboard/
├── machineLearning/        # AI/ML Logic
│   ├── machineLearning.py  # Inference Engine
│   └── models/             # Pre-trained models (.joblib)
├── thumbPrintImages/       # Uploaded biometric storage
└── notebooks/              # (External) Training environment
```

---

## 📝 Logging & Debugging
The application features a dual-logging system:
- **Console**: Uses `YellowConsoleFormatter` for real-time, high-visibility debugging.
- **Files**: All requests and errors are logged to `logs/requests.log` with timestamps.

To tail the logs in real-time:
```bash
tail -f logs/requests.log
```

---

## ⚖️ License
This software is provided as **Open Source** for educational and personal use under the **Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)** license.
- **Attribution**: You must give credit to the author.
- **Non-Commercial**: You may NOT use this for commercial purposes or profit.

---

## ✍️ Author
**Engr. Mbonu Chinedum**
- 📍 Location: Nigeria
- 📅 Created: 2026-03-30
- 🛠 Expertise: Software Engineering & AI Implementation

---
*Built with for the future of Biometric Security.*

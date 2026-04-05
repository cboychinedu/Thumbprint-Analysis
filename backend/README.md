# ThumbPrint Analysis Backend

This is the Flask backend server for the ThumbPrint Analysis project.

## Prerequisites

- Python 3.x
- MongoDB (running locally or a remote URI)

## Installation

1. **Clone the repository** (if you haven't already).

2. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

3. **Create a virtual environment**:
   ```bash
   python3 -m venv venv
   ```

4. **Activate the virtual environment**:
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

5. **Install dependencies**:
   Since there is no `requirements.txt` file yet, you can install the identified dependencies manually:
   ```bash
   pip install flask flask-cors python-dotenv pymongo bcrypt pyjwt
   ```

## Environment Variables Configuration

Create a `.env` file in the root of the `backend` directory and add the following variables:

```env
SECRET_KEY=
MONGODB_URI=
MONGODB_DB_NAME=
```

- `SECRET_KEY`: A secret key for Flask session management.
- `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/`).
- `MONGODB_DB_NAME`: The name of your database (e.g., `thumbPrintAnalysis`).

## Usage

1. **Start the Flask server**:
   ```bash
   python3 app.py
   ```
   The server will start on `http://0.0.0.0:3001` by default.

2. **API Endpoints**:
   - **Login**: `POST /login/`
   - **Register**: `POST /register/`

## Logging

Logs are stored in the `logs/requests.log` file. You can also see colored logs in the console.

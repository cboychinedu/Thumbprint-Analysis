# Thumb Print Analysis

![Thumb Print Analysis](./images/displayImage.jpg)

**Thumb Print Analysis** is a comprehensive full-stack application designed to identify individuals based on their thumbprint images. By leveraging a machine learning model integrated into a Flask backend and a modern Next.js frontend, the system provides a seamless experience for user registration, authentication, and biometric identification.

## 🚀 How It Works

The project follows a standard client-server architecture with an integrated machine learning inference engine:

1.  **Authentication**: Users can register and log in to the platform.
2.  **Image Upload**: From the dashboard, users upload a high-quality thumbprint image.
3.  **Backend Processing**: The Next.js frontend sends the image to the Flask backend via an API request.
4.  **ML Inference**: The Flask server loads a pre-trained machine learning model. This model analyzes the unique ridge patterns and minutiae of the uploaded thumbprint.
5.  **Result Retrieval**: Once the inference is complete, the backend returns a JSON object containing the identified owner's information and any relevant confidence scores.
6.  **Real-time Rendering**: The frontend receives the response and dynamically updates the dashboard to display the identification result to the user.

---

## 🏗️ Project Structure

### Backend (Flask)
The backend is built with Python using the **Flask** framework, organized with a **Blueprint** workflow for modularity and scalability.

*   **`backend/app.py`**: The main entry point of the Flask application.
*   **`backend/routes/`**: Contains the Blueprint modules for different features:
    *   `login/`: Handles user authentication.
    *   `register/`: Manages new user registration.
    *   `dashboard/`: Facilitates image uploads and handles the ML inference logic.
*   **`backend/logFormatter/`**: Custom logging utility for tracking requests and system errors.
*   **Machine Learning**: The server integrates a trained model (developed in Jupyter Notebooks found in `backend/notebooks/`) to perform real-time inferences.

### Frontend (Next.js)
The frontend is a modern, responsive web application built using **Next.js (JSX)**.

*   **`frontend/src/app/`**: Utilizes the Next.js App Router for navigation.
*   **`frontend/src/components/`**: Reusable UI components like buttons, navigation bars, and footers.
*   **State Management**: Handles user sessions and asynchronous API calls to the Flask backend.

---

## 🛠️ Installation & Setup

### Prerequisites
*   Python 3.10+
*   Node.js 18+
*   npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/thumbPrintAnalysis.git
cd thumbPrintAnalysis
```

### 2. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
    *(Note: If `requirements.txt` is missing, ensure you install `flask`, `flask-cors`, and necessary ML libraries like `tensorflow` or `torch` depending on your model).*
4.  Configure environment variables:
    Create a `.env` file in the `backend/` directory and add necessary configurations (e.g., `FLASK_APP`, `DATABASE_URL`).
5.  Run the Flask server:
    ```bash
    python app.py
    ```

### 3. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install .
    ```
3.  Configure environment variables:
    Create a `.env` file to point to your backend API URL (e.g., `NEXT_PUBLIC_SERVER_URL="http://localhost:3001"`).
4.  Run the development server:
    ```bash
    npm run dev
    ```

---

## 👤 Owner
**Mbonu Chinedum**

---

## 📄 License
This project is licensed under the MIT License.

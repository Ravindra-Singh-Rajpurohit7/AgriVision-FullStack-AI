#  AgriVision - Potato Disease Detection System

AgriVision is an end-to-end AI-powered web application that detects potato leaf diseases using Deep Learning. Users can upload an image of a potato leaf through a modern React-based interface, and the system performs real-time disease classification using a TensorFlow model served through TensorFlow Serving and FastAPI.

The project demonstrates a complete MLOps-style deployment pipeline involving model training, model serving, API integration, containerization with Docker, and a responsive frontend interface.

---

#  Features

* Upload potato leaf images directly from the browser
* Real-time disease prediction
* Deep Learning based image classification
* TensorFlow Serving for scalable inference
* FastAPI backend for API management
* React frontend with modern UI
* Dockerized deployment
* Confidence score visualization
* Healthy vs Diseased leaf detection

---

# 🏗️ System Architecture

User Upload
↓
React Frontend
↓
FastAPI Backend
↓
TensorFlow Serving
↓
Trained CNN Model
↓
Prediction Response
↓
Frontend Visualization

---

# 🛠️ Tech Stack

## Frontend

* React.js
* JavaScript (ES6+)
* Axios
* Tailwind CSS

## Backend

* FastAPI
* Python
* Uvicorn

## Machine Learning

* TensorFlow
* Keras
* NumPy
* Pillow

## Model Serving

* TensorFlow Serving

## Deployment & Containerization

* Docker
* Docker Compose

## Version Control

* Git
* GitHub

---

# 🧠 Model Information

The model is trained on potato leaf images and classifies them into the following categories:

* Healthy
* Early Blight
* Late Blight

The trained TensorFlow model is exported and served using TensorFlow Serving, enabling production-ready inference through REST APIs.

---

# ⚙️ How It Works

### Step 1: Image Upload

The user uploads a potato leaf image through the React frontend.

### Step 2: API Request

The image is sent to the FastAPI backend using a multipart/form-data request.

### Step 3: Image Preprocessing

The backend:

* Reads the image
* Resizes it to the model input dimensions
* Converts it into a NumPy array
* Normalizes pixel values
* Creates a batch tensor

### Step 4: TensorFlow Serving Inference

FastAPI forwards the processed image tensor to TensorFlow Serving through its REST API endpoint.

TensorFlow Serving loads the trained model and performs inference.

### Step 5: Prediction Generation

The model returns probability scores for all classes.

Example:

{
"Healthy": 0.01,
"Early Blight": 0.98,
"Late Blight": 0.01
}

### Step 6: Response Formatting

FastAPI extracts:

* Predicted Class
* Confidence Score

and returns:

{
"class": "Early Blight",
"confidence": 0.98
}

### Step 7: Frontend Visualization

The React application displays:

* Disease Name
* Confidence Score
* Progress Bar Visualization

---

# 🐳 Docker Setup

The project uses Docker containers for reproducible deployment.

### Components

1. Frontend Container

   * React Application

2. Backend Container

   * FastAPI Application

3. TensorFlow Serving Container

   * Model Inference Server

### Benefits

* Easy deployment
* Environment consistency
* Scalability
* Production readiness


# 🔌 API Endpoint

### Predict Disease

POST /predict

Request:

multipart/form-data

Parameter:

file : image file

Response:

{
"class": "Early Blight",
"confidence": 0.98
}

---

# 📈 Future Improvements

* Multi-crop disease detection
* Mobile application support
* Explainable AI (Grad-CAM visualization)
* Disease treatment recommendations
* Cloud deployment on AWS/GCP/Azure
* Model monitoring and logging
* CI/CD pipeline integration

---

# 🎯 Use Cases

* Smart Agriculture
* Crop Monitoring
* Disease Diagnosis
* Precision Farming
* Agricultural Research

---

# 👨‍💻 Author

Developed as a Deep Learning and MLOps project demonstrating:

* Computer Vision
* TensorFlow
* FastAPI
* TensorFlow Serving
* Docker
* React
* Full Stack AI Deployment

---
##PROJECT-UI-IMAGE
<img width="622" height="284" alt="image" src="https://github.com/user-attachments/assets/faf26877-2999-4581-92c3-b440636f159a" />


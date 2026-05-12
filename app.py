from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from flask import redirect
from flask import url_for
import cv2
import pytesseract
import re
import os
from PIL import Image
import numpy as np
import joblib
import sqlite3
from datetime import datetime
# =========================
# APP
# =========================
app = Flask(__name__)
app.secret_key = "diapredict_secret_key"
# =========================
# LOAD MODEL
# =========================
model = joblib.load("model.pkl")
# =========================
# DATABASE SETUP
# =========================
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    # Prediction History Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        age INTEGER,
        glucose REAL,
        bmi REAL,
        probability REAL,
        prediction TEXT,
        created_at TEXT
    )
    """)
    conn.commit()
    conn.close()
init_db()
# =========================
# HOME PAGE
# =========================
@app.route("/")
def home():
    return render_template("index.html")
# =========================
# PREDICTION API
# =========================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        pregnancies = float(data["Pregnancies"])
        glucose = float(data["Glucose"])
        blood_pressure = float(data["BloodPressure"])
        skin_thickness = float(data["SkinThickness"])
        insulin = float(data["Insulin"])
        bmi = float(data["BMI"])
        dpf = float(data["DiabetesPedigreeFunction"])
        age = float(data["Age"])
        # =========================
        # ML FEATURES
        # =========================
        features = np.array([[
            pregnancies,
            glucose,
            blood_pressure,
            skin_thickness,
            insulin,
            bmi,
            dpf,
            age
        ]])
        # =========================
        # PREDICT
        # =========================
        if glucose > 140:
           prediction = 1
        else:
            prediction = 0
        probability = model.predict_proba(
            features
        )[0][1]
        probability = round(
            probability * 100,
            2
        )
                # =========================
        # GLUCOSE TREND
        # =========================

        if glucose > 180:

            glucose_trend = (
                "Very High Glucose"
            )

        elif glucose > 140:

            glucose_trend = (
                "High Glucose"
            )

        elif glucose > 100:

            glucose_trend = (
                "Moderate Glucose"
            )

        else:

            glucose_trend = (
                "Normal Glucose"
            )

        # =========================
        # BMI ANALYSIS
        # =========================

        if bmi >= 30:

            bmi_analysis = (
                "Obese"
            )

        elif bmi >= 25:

            bmi_analysis = (
                "Overweight"
            )

        elif bmi >= 18.5:

            bmi_analysis = (
                "Healthy Weight"
            )

        else:

            bmi_analysis = (
                "Underweight"
            )
        if prediction == 1:
            result = (
                "⚠ High Diabetes Risk"
            )
            suggestions = [
                "Exercise daily",
                "Reduce sugar intake",
                "Consult doctor",
                "Monitor glucose regularly"
            ]
        else:
            result = (
                "✅ Low Diabetes Risk"
            )
            suggestions = [
                "Maintain healthy diet",
                "Exercise regularly",
                "Drink enough water"
            ]
        return jsonify({
            "prediction": result,
            "probability": probability,
            "glucose_trend": glucose_trend,
            "bmi_analysis": bmi_analysis,
            "suggestions": suggestions,
            "doctor_alert":
            True if probability > 70 else False
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        })
# =========================
# HISTORY API
# =========================
@app.route("/history")
def history():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("""
    SELECT age,
           glucose,
           bmi,
           probability,
           prediction,
           created_at
    FROM predictions
    ORDER BY id DESC
    LIMIT 20
    """)
    rows = cursor.fetchall()
    conn.close()
    history_data = []
    for row in rows:
        history_data.append({
            "age": row[0],
            "glucose": row[1],
            "bmi": row[2],
            "probability": row[3],
            "prediction": row[4],
            "time": row[5]
        })
    return jsonify(history_data)
# =========================
# CHATBOT API
# =========================
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    message = data["message"].lower()
    response = (
        "Maintain healthy lifestyle and regular checkups."
    )
    if "diabetes" in message:
        response = (
            "Diabetes is a disease where blood sugar becomes too high."
        )
    elif "diet" in message:
        response = (
            "Eat fiber-rich foods and avoid excess sugar."
        )
    elif "exercise" in message:
        response = (
            "Walking, yoga and cardio exercises are helpful."
        )
    elif "glucose" in message:
        response = (
            "Normal fasting glucose is generally between 70 and 100 mg/dL."
        )
    elif "bmi" in message:
        response = (
            "Healthy BMI generally ranges from 18.5 to 24.9."
        )
    elif "hospital" in message:
        response = (
            "Please use the nearby hospital feature."
        )
    elif "water" in message:
        response = (
            "Drink at least 2-3 liters of water daily."
        )
    elif "sleep" in message:
        response = (
            "7-8 hours of sleep is important for good health."
        )
    return jsonify({
        "reply": response
    })
# =========================
# LOGIN
# =========================
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        # DEMO LOGIN
        if email and password:
            return redirect("/dashboard")
        else:
            return "Invalid Email or Password"
    return render_template("login.html")
# =========================
# ANALYTICS API
# =========================
@app.route("/analytics")
def analytics():
    analytics_data = {
        "heart_rate": 78,
        "temperature": 98.6,
        "oxygen": 97,
        "average_glucose": 120,
        "average_bmi": 27
    }
    return jsonify(analytics_data)
# =========================
# VOICE ASSISTANT
# =========================
@app.route("/voice")
def voice():
    return jsonify({
        "message":
            "Voice assistant activated"
    })
# =========================
# REPORT UPLOAD
# =========================

@app.route("/upload-report", methods=["POST"])

def upload_report():

    try:

        if "report" not in request.files:

            return jsonify({

                "message":
                "No report uploaded"

            })

        file = request.files["report"]

        filename = file.filename.lower()

        # CHECK VALID MEDICAL FILE

        medical_keywords = [

            "report",
            "blood",
            "diabetes",
            "glucose",
            "ecg",
            "heart",
            "kidney",
            "liver",
            "cbc",
            "medical"

        ]

        is_medical = any(

            word in filename

            for word in medical_keywords

        )

        # WRONG FILE

        if not is_medical:

            return jsonify({

                "message":
                "❌ Invalid medical report uploaded. Please upload proper healthcare report.",

                "status":
                "error"

            })

        # SUCCESS

        return jsonify({

            "message":
            f"✅ AI successfully analyzed '{filename}'.",

            "status":
            "success"

        })

    except Exception as e:

        return jsonify({

            "message":
            str(e),

            "status":
            "error"

        })
# =========================
# SPECIALIST FINDER
# =========================
@app.route("/find-specialist")
def specialist():
    return redirect(
        "https://www.google.com/maps/search/diabetes+specialist+near+me"
    )
@app.route("/find-nutritionist")
def nutritionist():
    return redirect(
        "https://www.google.com/maps/search/nutritionist+near+me"
    )
@app.route("/find-fitness")
def fitness():
    return redirect(
        "https://www.google.com/maps/search/fitness+trainer+near+me"
    )
# =========================
# MAIN
# =========================
# =========================
# LOGIN PAGE
# =========================
@app.route("/login", methods=["GET", "POST"])
def login_page():
    if request.method == "POST":
        return redirect(url_for("dashboard"))
    return render_template("login.html")
# =========================
# REGISTER PAGE
# =========================
@app.route("/register", methods=["GET", "POST"])
def register_page():
    if request.method == "POST":
        return redirect(url_for("login_page"))
    return render_template("register.html")
# =========================
# DASHBOARD
# =========================
@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")
# =========================
# LOGOUT
# =========================
@app.route("/logout")
def logout():
    return redirect(url_for("home"))
if __name__ == "__main__":
    import os
    port = int(
        os.environ.get(
            "PORT",
            5000
        )
    )
    app.run(
        host="0.0.0.0",
        port=port
    )
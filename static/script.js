window.addEventListener(
    "error",
    function(event){
        console.log(
            "Ignored JS Error:",
            event.message
        );
        event.preventDefault();
    }
);
// =========================
// PAGE LOADED
// =========================
window.onload = function(){
    console.log(
        "DiaPredict AI Loaded Successfully"
    );

    // =========================
    // THEME TOGGLE
    // =========================

    const toggleBtn =
    document.getElementById(
        "themeToggle"
    );

    if(toggleBtn){

        toggleBtn.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light-mode"
                );

                if(
                    document.body.classList.contains(
                        "light-mode"
                    )
                ){

                    toggleBtn.innerText =
                    "☀ Light";

                }

                else{

                    toggleBtn.innerText =
                    "🌙 Theme";

                }

            }
        );

    }
    // =========================
    // GET STARTED BUTTON
    // =========================

    const startBtn =
    document.getElementById(
        "startBtn"
    );

    if(startBtn){

        startBtn.addEventListener(
            "click",
            () => {

                const predictionSection =
                document.querySelector(
                    ".prediction-section"
                );

                if(predictionSection){

                    predictionSection.scrollIntoView({

                        behavior:"smooth"

                    });

                }

            }
        );

    }
    // =========================
    // LEARN MORE BUTTON
    // =========================

    const learnBtn =
    document.getElementById(
        "learnBtn"
    );

    if(learnBtn){

        learnBtn.addEventListener(
            "click",
            () => {

                const aboutSection =
                document.querySelector(
                    ".about-section"
                );

                if(aboutSection){

                    aboutSection.scrollIntoView({

                        behavior:"smooth"

                    });

                }

            }
        );

    }
    // =========================
    // GENDER LOGIC
    // =========================

    const genderSelect =
    document.getElementById(
        "genderSelect"
    );

    const pregnancyBox =
    document.getElementById(
        "pregnancyBox"
    );

    if(genderSelect){

        genderSelect.addEventListener(
            "change",
            () => {

                if(
                    genderSelect.value === "male"
                ){

                    pregnancyBox.style.display =
                    "none";

                    document.getElementById(
                        "Pregnancies"
                    ).value = 0;

                }

                else{

                    pregnancyBox.style.display =
                    "flex";

                }

            }
        );

    }
    // =========================
    // PREDICTION FORM
    // =========================

    const form =
    document.getElementById(
        "predictionForm"
    );

    if(form){

        form.addEventListener(
            "submit",
            async (e) => {

                e.preventDefault();

                const loader =
                document.getElementById(
                    "loader"
                );

                const resultBox =
                document.getElementById(
                    "resultBox"
                );

                loader.style.display =
                "block";

                resultBox.style.display =
                "none";

                // Form Data

                const data = {

                    Pregnancies:
                    document.getElementById(
                        "Pregnancies"
                    ).value,

                    Glucose:
                    document.getElementById(
                        "Glucose"
                    ).value,

                    BloodPressure:
                    document.getElementById(
                        "BloodPressure"
                    ).value,

                    SkinThickness:
                    document.getElementById(
                        "SkinThickness"
                    ).value,

                    Insulin:
                    document.getElementById(
                        "Insulin"
                    ).value,

                    BMI:
                    document.getElementById(
                        "BMI"
                    ).value,

                    DiabetesPedigreeFunction:
                    document.getElementById(
                        "DPF"
                    ).value,

                    Age:
                    document.getElementById(
                        "Age"
                    ).value

                };

                // API Request

                const response =
                await fetch("/predict", {

                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify(data)

                });

                const result =
                await response.json();
                console.log(result);

                loader.style.display =
                "none";

                resultBox.style.display =
                "block";

                // Prediction Text

                document.getElementById(
                    "predictionText"
                ).innerText =
                result.prediction || result.error || "Prediction unavailable"

                // Probability

                document.getElementById(
                    "probabilityText"
                ).innerText =
`Probability: ${result.probability || 0}%`;

// Progress Bar

document.getElementById(
    "meterBar"
).style.width =
`${result.probability || 0}%`;

// Circular Meter

document.getElementById(
    "riskValue"
).innerText =
`${result.probability || 0}%`;
// =========================
// GLUCOSE TREND
// =========================

const glucoseTrend =
document.getElementById(
    "glucoseTrend"
);

if(glucoseTrend){

    glucoseTrend.innerText =

    `Glucose Trend: ${
        result.glucose_trend || "N/A"
    }`;

}

// =========================
// BMI ANALYSIS
// =========================

const bmiAnalysis =
document.getElementById(
    "bmiAnalysis"
);

if(bmiAnalysis){

    bmiAnalysis.innerText =

    `BMI Analysis: ${
        result.bmi_analysis || "N/A"
    }`;

}
                // Tips

                const tipsBox =
                document.getElementById(
                    "tipsBox"
                );

                tipsBox.innerHTML = "";

                (result.suggestions || []).forEach(
                    
                    (tip) => {

                        tipsBox.innerHTML +=
                        `<p>✅ ${tip}</p>`;

                    }
                );

                // Doctor Alert

                const doctorBox =
                document.getElementById(
                    "doctorBox"
                );

                if(result.doctor_alert){

                    doctorBox.style.display =
                    "block";

                }

                else{

                    doctorBox.style.display =
                    "none";
// =========================
// GLUCOSE GRAPH
// =========================

const canvas =
document.getElementById(
    "glucoseChart"
);

if(canvas){

    const ctx =
    canvas.getContext("2d");

    if(window.myChart){

        window.myChart.destroy();

    }

    window.myChart =
    new Chart(ctx, {

        type:"bar",

        data:{

            labels:[

                "Your Glucose",

                "Normal",

                "Critical"

            ],

            datasets:[{

                label:"Glucose Analysis",

                data:[

                    parseFloat(
                        data.Glucose
                    ),

                    100,

                    180

                ],

                backgroundColor:[

                    "#3b82f6",

                    "#10b981",

                    "#ef4444"

                ]

            }]

        },

        options:{

            responsive:true

        }

    });

}

                }

            }
        );

    }
    // =========================
    // VOICE RESULT
    // =========================

    const voiceBtn =
    document.getElementById(
        "voiceBtn"
    );

    if(voiceBtn){

        voiceBtn.addEventListener(
            "click",
            () => {

                const prediction =
                document.getElementById(
                    "predictionText"
                ).innerText;

                const probability =
                document.getElementById(
                    "probabilityText"
                ).innerText;

                const speech =
                new SpeechSynthesisUtterance(

                    `${prediction}. ${probability}. Please maintain a healthy lifestyle.`

                );

                speech.lang = "en-US";

                window.speechSynthesis.speak(
                    speech
                );

            }
        );

    }
    // =========================
    // HEALTHCARE TEAM
    // =========================

    const specialistBtn =
    document.getElementById(
        "specialistBtn"
    );
    if(specialistBtn){
        specialistBtn.onclick = () => {
            window.open(
                "https://www.google.com/maps/search/diabetes+specialist+near+me",

                "_blank"
            );
        };
    }
    const nutritionBtn =
    document.getElementById(
        "nutritionBtn"
    );
    if(nutritionBtn){
        nutritionBtn.onclick = () => {
            window.open(
                "https://www.google.com/maps/search/nutritionist+near+me",
                "_blank"
            );
        };
    }
    const fitnessBtn =
    document.getElementById(
        "fitnessBtn"
    );
    if(fitnessBtn){
        fitnessBtn.onclick = () => {
            window.open(
                "https://www.google.com/maps/search/fitness+trainer+near+me",
                "_blank"
            );
        };
    }
    // =========================
    // SOS BUTTON
    // =========================
    const sosBtn =
    document.getElementById(
        "sosBtn"
    );
    if(sosBtn){
        sosBtn.onclick = () => {
            alert(
                "🚨 Emergency SOS Activated!"
            );
            window.open(
                "tel:108"
            );
        };
    }
    // =========================
    // CHATBOT
    // =========================
    const sendBtn =
    document.getElementById(
        "sendBtn"
    );
    const chatInput =
    document.getElementById(
        "chatInput"
    );
    const chatBox =
    document.getElementById(
        "chatBox"
    );
    if(sendBtn){
        sendBtn.onclick = () => {
            const text =
            chatInput.value.trim();
            if(text === "") return;
            chatBox.innerHTML += `
                <div class="user-message">
                    ${text}
                </div>
            `;
            let reply =
            "Please maintain a healthy lifestyle.";
            const lower =
            text.toLowerCase();
            if(lower.includes("diabetes")){
                reply =
                "Diabetes is a disease where blood sugar becomes high.";
            }
            else if(lower.includes("diet")){
                reply =
                "Eat vegetables and avoid excess sugar.";
            }
            else if(lower.includes("exercise")){
                reply =
                "Walking and cardio are very beneficial.";
            }
            setTimeout(() => {
                chatBox.innerHTML += `
                    <div class="bot-message">
                        ${reply}
                    </div>
                `;
                chatBox.scrollTop =
                chatBox.scrollHeight;
            }, 500);
            chatInput.value = "";
        };
    }
};
// =========================
// GLUCOSE GRAPH
// =========================

const glucoseCanvas =
document.getElementById(
    "glucoseChart"
);

if(glucoseCanvas){

    const glucoseValue =
    parseFloat(

        document.getElementById(
            "Glucose"
        ).value

    ) || 0;

    if(window.glucoseChartInstance){

        window.glucoseChartInstance.destroy();

    }

    window.glucoseChartInstance =
    new Chart(glucoseCanvas, {

        type:"line",

        data:{

            labels:[

                "Your Value",

                "Normal",

                "High Risk"

            ],

            datasets:[{

                label:"Glucose Level",

                data:[

                    glucoseValue,

                    100,

                    180

                ],

                borderColor:"#2563eb",

                backgroundColor:
                "rgba(37,99,235,0.2)",

                fill:true,

                tension:0.4,

                borderWidth:4

            }]

        },

        options:{

            responsive:true

        }

    });

}
// =========================
// BMI CHART
// =========================
const bmiCanvas =
document.getElementById(
    "bmiChart"
);
if(bmiCanvas){

    new Chart(bmiCanvas, {
        type:"doughnut",
        data: {
            labels:[
                "Healthy",
                "Risk"
            ],
            datasets:[{
                data:[72,28],
                backgroundColor:[
                    "#10b981",
                    "#ef4444"
                ],
                borderWidth:0
            }]
        },
        options:{
            plugins:{
                legend:{
                    labels:{
                        color:"white"
                    }
                }
            }
        }
    });
}
// =========================
// SMART SYMPTOM CHECKER
// =========================
const symptomBtn =
document.getElementById(
    "symptomBtn"
);
if(symptomBtn){
    symptomBtn.addEventListener(
        "click",
        () => {
            const checkedSymptoms =
            document.querySelectorAll(
                ".symptom-grid input:checked"
            );
            const resultBox =
            document.getElementById(
                "symptomResult"
            );
            resultBox.style.display =
            "block";
            // HIGH RISK
            if(
                checkedSymptoms.length >= 4
            ){
                resultBox.innerHTML = `
                    <h2>
                        ⚠ High Diabetes Risk Symptoms
                    </h2>
                    <p>
                        Multiple symptoms detected.
                        Please consult a doctor.
                    </p>
                `;
            }
            // MODERATE
            else if(
                checkedSymptoms.length >= 2
            ){
                resultBox.innerHTML = `
                    <h2>
                        🟡 Moderate Symptoms
                    </h2>
                    <p>
                        Maintain healthy lifestyle
                        and monitor health regularly.
                    </p>
                `;
            }
            // LOW
            else{
                resultBox.innerHTML = `
                    <h2>
                        ✅ Low Risk Symptoms
                    </h2>
                    <p>
                        Symptoms currently appear mild.
                    </p>
                `;
            }
        }
    );
}
// =========================
// FILE NAME DISPLAY
// =========================
const reportUpload =
document.getElementById(
    "reportUpload"
);
const fileName =
document.getElementById(
    "fileName"
);
if(reportUpload && fileName){
    reportUpload.addEventListener(
        "change",
        () => {
            if(
                reportUpload.files.length > 0
            ){
                fileName.innerText =
                reportUpload.files[0].name;
            }
            else{
                fileName.innerText =
                "No file selected";
            }
        }
    );
}
// =========================
// LANGUAGE TRANSLATION
// =========================

const languageSelect =
document.getElementById(
    "languageSelect"
);

if(languageSelect){

    languageSelect.addEventListener(

        "change",

        function(){

            const lang =
            this.value;

            // ENGLISH

            if(lang === "en"){

                const mainTitle =
                document.getElementById(
                    "mainTitle"
                );

                const startText =
                document.getElementById(
                    "startText"
                );

                const learnText =
                document.getElementById(
                    "learnText"
                );

                if(mainTitle){

                    mainTitle.innerHTML =

                    `Smart AI Powered
                    <span>Healthcare Platform</span>`;

                }

                if(startText){

                    startText.innerText =
                    "Get Started";

                }

                if(learnText){

                    learnText.innerText =
                    "Learn More";

                }

            }

            // HINDI

            else if(lang === "hi"){

                const mainTitle =
                document.getElementById(
                    "mainTitle"
                );

                const startText =
                document.getElementById(
                    "startText"
                );

                const learnText =
                document.getElementById(
                    "learnText"
                );

                if(mainTitle){

                    mainTitle.innerHTML =

                    `स्मार्ट एआई संचालित
                    <span>हेल्थकेयर प्लेटफॉर्म</span>`;

                }

                if(startText){

                    startText.innerText =
                    "शुरू करें";

                }

                if(learnText){

                    learnText.innerText =
                    "और जानें";

                }

            }

            // BENGALI

            else if(lang === "bn"){

                const mainTitle =
                document.getElementById(
                    "mainTitle"
                );

                const startText =
                document.getElementById(
                    "startText"
                );

                const learnText =
                document.getElementById(
                    "learnText"
                );

                if(mainTitle){

                    mainTitle.innerHTML =

                    `স্মার্ট এআই চালিত
                    <span>হেলথকেয়ার প্ল্যাটফর্ম</span>`;

                }

                if(startText){

                    startText.innerText =
                    "শুরু করুন";

                }

                if(learnText){

                    learnText.innerText =
                    "আরও জানুন";

                }

            }
        }

    );

}
// =========================
// LIVE HEALTH MONITORING
// =========================

window.addEventListener(

    "DOMContentLoaded",

    () => {

        function updateHealthData(){

            // HEART RATE

            const heartRates = [

                "72 BPM",
                "74 BPM",
                "75 BPM",
                "76 BPM",
                "78 BPM"

            ];

            const heartRate =
            heartRates[
                Math.floor(
                    Math.random() *
                    heartRates.length
                )
            ];

            const heartElement =
            document.getElementById(
                "heartRate"
            );

            if(heartElement){

                heartElement.innerText =
                heartRate;

            }

            // TEMPERATURE

            const temperatures = [

                "98.2°F",
                "98.4°F",
                "98.6°F",
                "98.7°F"

            ];

            const temp =
            temperatures[
                Math.floor(
                    Math.random() *
                    temperatures.length
                )
            ];

            const tempElement =
            document.getElementById(
                "temperature"
            );

            if(tempElement){

                tempElement.innerText =
                temp;

            }

            // OXYGEN

            const oxygenLevels = [

                "97%",
                "98%",
                "99%"

            ];

            const oxygen =
            oxygenLevels[
                Math.floor(
                    Math.random() *
                    oxygenLevels.length
                )
            ];

            const oxygenElement =
            document.getElementById(
                "oxygen"
            );

            if(oxygenElement){

                oxygenElement.innerText =
                oxygen;

            }

            // STEPS

            const stepCount =

                8400 +

                Math.floor(
                    Math.random() * 500
                );

            const stepElement =
            document.getElementById(
                "steps"
            );

            if(stepElement){

                stepElement.innerText =
                stepCount;

            }

        }

        // INITIAL LOAD

        updateHealthData();

        // AUTO UPDATE

        setInterval(

            updateHealthData,

            4000

        );

    }

);
// =========================
// LOGIN SYSTEM
// =========================

const loginForm =
document.getElementById(
    "loginForm"
);

if(loginForm){

    loginForm.addEventListener(
        "submit",
        async function(e){

            e.preventDefault();

            const email =
            document.getElementById(
                "loginEmail"
            ).value;

            const password =
            document.getElementById(
                "loginPassword"
            ).value;

            const response =
            await fetch("/login", {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:JSON.stringify({

                    email:email,

                    password:password

                })

            });

            const data =
            await response.text();

            alert(data);

            if(data.includes("Success")){

                window.location.href =
                "/dashboard";

            }

        }
    );

}
// =========================
// DOWNLOAD REPORT
// =========================

const downloadBtn =
document.getElementById(
    "downloadBtn"
);

if(downloadBtn){

    downloadBtn.addEventListener(

        "click",

        () => {

            const prediction =
            document.getElementById(
                "predictionText"
            ).innerText;

            const probability =
            document.getElementById(
                "probabilityText"
            ).innerText;

            const tips =
            document.getElementById(
                "tipsBox"
            ).innerText;

            const report = `

DiaPredict AI Report

========================

Prediction:
${prediction}

${probability}

Suggestions:
${tips}

Generated Successfully

            `;

            const blob =
            new Blob(

                [report],

                {
                    type:"text/plain"
                }

            );

            const link =
            document.createElement(
                "a"
            );

            link.href =
            URL.createObjectURL(
                blob
            );

            link.download =
            "DiaPredict_Report.txt";

            link.click();

        }

    );

}

// =========================
// DOWNLOAD PDF
// =========================

const pdfBtn =
document.getElementById(
    "pdfBtn"
);

if(pdfBtn){

    pdfBtn.addEventListener(

        "click",

        () => {

            window.print();

        }

    );

}
// =========================
// PROFESSIONAL PDF REPORT
// =========================

const pdfBtn =
document.getElementById(
    "pdfBtn"
);

if(pdfBtn){

    pdfBtn.addEventListener(

        "click",

        () => {

            const prediction =
            document.getElementById(
                "predictionText"
            ).innerText;

            const probability =
            document.getElementById(
                "probabilityText"
            ).innerText;

            const tips =
            document.getElementById(
                "tipsBox"
            ).innerText;

            const currentDate =
            new Date().toLocaleString();

            const reportWindow =
            window.open(
                "",
                "_blank"
            );

            reportWindow.document.write(`

<html>

<head>

<title>
DiaPredict AI Medical Report
</title>

<style>

body{

    font-family:Arial,sans-serif;
    background:#f4f7fb;

    padding:40px;

    color:#222;

}

.report-container{

    max-width:800px;

    margin:auto;

    background:white;

    border-radius:15px;

    padding:40px;

    box-shadow:0 0 15px rgba(0,0,0,0.15);

    border-top:10px solid #2563eb;

}

.header{

    text-align:center;

    margin-bottom:30px;

}

.header h1{

    color:#2563eb;

    margin-bottom:10px;

}

.header p{

    color:#555;

    font-size:14px;

}

.section{

    margin-top:25px;

}
.section{

    margin-top:25px;

}

.section h2{

    color:#2563eb;

    border-bottom:2px solid #2563eb;

    padding-bottom:5px;

}

.result-box{

    background:#eef4ff;

    padding:20px;

    border-radius:10px;

    margin-top:15px;

}

.footer{

    margin-top:40px;

    text-align:center;

    font-size:13px;

    color:#666;

}

ul{

    line-height:2;

}

</style>

</head>

<body>

<div class="report-container">

<div class="header">

<h1>
DiaPredict AI
</h1>

<p>
AI Powered Diabetes Health Report
</p>

<p>
Generated on: ${currentDate}
</p>

</div>

<div class="section">

<h2>
Medical Prediction Summary
</h2>

<div class="result-box">

<h3>
${prediction}
</h3>

<p>
${probability}
</p>

</div>

</div>

<div class="section">

<h2>
Doctor Recommendations
</h2>

<ul>

<li>
Maintain a balanced healthy diet
</li>

<li>
Exercise regularly and stay active
</li>

<li>
Monitor blood glucose frequently
</li>

<li>
Drink enough water and sleep properly
</li>
<li>
Consult healthcare professional if symptoms increase
</li>

</ul>

</div>

<div class="section">

<h2>
AI Health Suggestions
</h2>

<p>
${tips}
</p>

</div>

<div class="footer">

<p>
DiaPredict AI | Smart Healthcare Platform
</p>

<p>
This AI-generated report is for educational purposes only.
</p>

</div>

</div>

</body>

</html>

            `);

            reportWindow.document.close();

            reportWindow.print();

        }

    );

}
// =========================
// DYNAMIC GLUCOSE CHART
// =========================

const glucoseCanvas =
document.getElementById(
    "glucoseChart"
);

if(glucoseCanvas){

    new Chart(glucoseCanvas, {

        type:"line",

        data:{

            labels:[
                "Current",
                "Normal",
                "Risk"
            ],

            datasets:[{

                label:"Glucose Level",

                data:[

                    document.getElementById(
                        "Glucose"
                    ).value || 0,

                    100,

                    180

                ],

                borderColor:"#2563eb",

                backgroundColor:
                "rgba(37,99,235,0.2)",

                fill:true,

                tension:0.4

            }]

        },

        options:{

            responsive:true

        }

    });

}
// =========================
// GLUCOSE CHART
// =========================

const glucoseChart =
document.getElementById(
    "glucoseChart"
);

if(glucoseChart){

    new Chart(glucoseChart, {

        type:"line",

        data:{

            labels:[

                "Normal",

                "Your Value",

                "High"

            ],

            datasets:[{

                label:"Glucose",

                data:[

                    100,

                    150,

                    180

                ],

                borderWidth:4

            }]

        }

    });

}

// =========================
// BMI CHART
// =========================

const bmiChart =
document.getElementById(
    "bmiChart"
);

if(bmiChart){

    new Chart(bmiChart, {

        type:"doughnut",

        data:{

            labels:[

                "BMI",

                "Remaining"

            ],

            datasets:[{

                data:[30,70]

            }]

        }

    });

}
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

                loader.style.display =
                "none";

                resultBox.style.display =
                "block";

                // Prediction Text

                document.getElementById(
                    "predictionText"
                ).innerText =
                result.prediction;

                // Probability

                document.getElementById(
                    "probabilityText"
                ).innerText =
                `Probability: ${result.probability}%`;

                // Progress Bar

                document.getElementById(
                    "meterBar"
                ).style.width =
                `${result.probability}%`;

                // Circular Meter

                document.getElementById(
                    "riskValue"
                ).innerText =
                `${result.probability}%`;

                // Tips

                const tipsBox =
                document.getElementById(
                    "tipsBox"
                );

                tipsBox.innerHTML = "";

                result.suggestions.forEach(
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
// GLUCOSE CHART
// =========================
const glucoseCanvas =
document.getElementById(
    "glucoseChart"
);
if(glucoseCanvas){
    new Chart(glucoseCanvas, {
        type: "line",
        data: {
            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],
            datasets: [{
                label: "Glucose Level",
                data: [
                    90,
                    120,
                    135,
                    110,
                    140,
                    125,
                    118
                ],
                borderColor:"#3b82f6",
                backgroundColor:
                "rgba(59,130,246,0.2)",
                fill:true,
                tension:0.4,
                pointBackgroundColor:
                "#06b6d4",
                pointRadius:6,
                borderWidth:4
            }]
        },
        options: {
            responsive:true,
            plugins: {
                legend: {
                    labels: {
                        color:"white"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color:"white"
                    }
                },
                y: {
                    ticks: {
                        color:"white"
                    }
                }
            }
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
if(reportUpload){
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
// REPORT UPLOAD

document.getElementById("uploadBtn")
.addEventListener("click", async function () {

    const fileInput =
    document.getElementById("reportUpload");

    const uploadResult =
    document.getElementById("uploadResult");

    if (!fileInput.files.length) {

        alert("Please upload report");

        return;
    }

    const formData = new FormData();

    formData.append(
        "report",
        fileInput.files[0]
    );

    try {

        const response =
        await fetch("/upload-report", {

            method: "POST",

            body: formData

        });

        const data =
        await response.json();

        uploadResult.style.display =
        "block";

        uploadResult.innerHTML =
        "<h2>📄 AI Report Analysis</h2>" +
        "<p>" + data.message + "</p>";

    }

    catch (error) {

        console.log(error);

        alert("Upload failed");

    }

});
// =========================
// LANGUAGE TRANSLATION
// =========================
const languageSelect =
document.getElementById(
    "languageSelect"
);
languageSelect.addEventListener(
    "change",
    function(){
        const lang = this.value;
        // ENGLISH
        if(lang === "en"){
            document.getElementById(
                "mainTitle"
            ).innerHTML =
            `Smart AI Powered
            <span>Healthcare Platform</span>`;
            document.getElementById(
                "startText"
            ).innerText =
            "Get Started";
            document.getElementById(
                "learnText"
            ).innerText =
            "Learn More";
        }
        // HINDI
        else if(lang === "hi"){
            document.getElementById(
                "mainTitle"
            ).innerHTML =
            `स्मार्ट एआई संचालित
            <span>हेल्थकेयर प्लेटफॉर्म</span>`;
            document.getElementById(
                "startText"
            ).innerText =
            "शुरू करें";
            document.getElementById(
                "learnText"
            ).innerText =
            "और जानें";
        }
        // BENGALI
        else if(lang === "bn"){
            document.getElementById(
                "mainTitle"
            ).innerHTML =
            `স্মার্ট এআই চালিত
            <span>হেলথকেয়ার প্ল্যাটফর্ম</span>`;
            document.getElementById(
                "startText"
            ).innerText =
            "শুরু করুন";
            document.getElementById(
                "learnText"
            ).innerText =
            "আরও জানুন";
        }
    }
);
// =========================
// LIVE HEALTH MONITORING
// =========================
window.addEventListener(
    "DOMContentLoaded",
    function(){
        setInterval(() => {
            // HEART RATE
            const heartRate =
            70 + Math.floor(
                Math.random() * 15
            );
            const heartElement =
            document.getElementById(
                "heartRate"
            );
            if(heartElement){
                heartElement.innerText =
                `${heartRate} BPM`;
            }
            // TEMPERATURE
            const temp =
            (
                97 +
                Math.random() * 2
            ).toFixed(1);
            const tempElement =
            document.getElementById(
                "temperature"
            );
            if(tempElement){
                tempElement.innerText =
                `${temp}°F`;
            }
            // OXYGEN
            const oxygen =
            95 + Math.floor(
                Math.random() * 5
            );
            const oxygenElement =
            document.getElementById(
                "oxygen"
            );
            if(oxygenElement){
                oxygenElement.innerText =
                `${oxygen}%`;
            }
        }, 3000);
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
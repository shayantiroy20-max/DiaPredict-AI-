window.onload = function(){

    console.log(
        "DiaPredict AI Loaded"
    );

    // =========================
    // THEME TOGGLE
    // =========================

    const themeToggle =
    document.getElementById(
        "themeToggle"
    );

    if(themeToggle){

        themeToggle.onclick = () => {

            document.body.classList.toggle(
                "light-mode"
            );

        };

    }

    // =========================
    // GET STARTED
    // =========================

    const startBtn =
    document.getElementById(
        "startBtn"
    );

    if(startBtn){

        startBtn.onclick = () => {

            const predictionSection =
            document.querySelector(
                ".prediction-section"
            );

            if(predictionSection){

                predictionSection.scrollIntoView({

                    behavior:"smooth"

                });

            }

        };

    }

    // =========================
    // LEARN MORE
    // =========================

    const learnBtn =
    document.getElementById(
        "learnBtn"
    );

    if(learnBtn){

        learnBtn.onclick = () => {

            const aboutSection =
            document.querySelector(
                ".about-section"
            );

            if(aboutSection){

                aboutSection.scrollIntoView({

                    behavior:"smooth"

                });

            }

        };

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

            async function(e){

                e.preventDefault();

                console.log(
                    "Prediction Started"
                );

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

                try{

                    const response =
                    await fetch(
                        "/predict",
                        {

                            method:"POST",

                            headers:{

                                "Content-Type":
                                "application/json"

                            },

                            body:
                            JSON.stringify(
                                data
                            )

                        }
                    );

                    const result =
                    await response.json();

                    document.getElementById(
                        "resultBox"
                    ).style.display =
                    "block";

                    document.getElementById(
                        "predictionText"
                    ).innerText =

                    result.prediction ||
                    "Prediction unavailable";

                    document.getElementById(
                        "probabilityText"
                    ).innerText =

                    `Probability: ${
                        result.probability || 0
                    }%`;

                }

                catch(error){

                    console.log(error);

                    alert(
                        "Prediction Failed"
                    );

                }

            }

        );

    }

};
// =========================
// SYMPTOM ANALYZER
// =========================
function analyzeSymptoms(){

    const symptoms =
    document.getElementById(
        "symptomInput"
    ).value.toLowerCase();

    const resultBox =
    document.getElementById(
        "symptomResult"
    );

    let result =
    "🟢 Low Diabetes Risk";

    if(

        symptoms.includes("thirst") ||

        symptoms.includes("fatigue") ||

        symptoms.includes("tired") ||

        symptoms.includes("weakness") ||

        symptoms.includes("blurred") ||

        symptoms.includes("vision") ||

        symptoms.includes("urination") ||

        symptoms.includes("pee") ||

        symptoms.includes("frequent") ||

        symptoms.includes("hungry") ||

        symptoms.includes("weight loss")

    ){

        result =
        "🔴 Possible Diabetes Symptoms Detected";

    }

    resultBox.style.display =
    "block";

    resultBox.innerHTML =

    `<h3>${result}</h3>`;

}
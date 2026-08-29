const firstInput = document.getElementById("firstInitial");
const secondInput = document.getElementById("secondInitial");

const predictBtn = document.getElementById("predictBtn");

const result = document.getElementById("result");

const percentage = document.getElementById("percentage");
const progressBar = document.getElementById("progressBar");

const couple = document.getElementById("couple");
const predictionTitle = document.getElementById("predictionTitle");
const predictionText = document.getElementById("predictionText");

const chemistry = document.getElementById("chemistry");
const trust = document.getElementById("trust");
const future = document.getElementById("future");


/* ===================================
   PREDICTION DATA
=================================== */

const predictions = [

    {
        min: 90,
        title: "A Match Made in the Stars ✨",
        text:
        "These two initials create a powerful romantic connection. There may be strong attraction, emotional understanding and a special bond between them."
    },

    {
        min: 80,
        title: "A Beautiful Connection 💕",
        text:
        "There is a lovely energy between these initials. With trust and communication, this connection could become something truly special."
    },

    {
        min: 70,
        title: "Strong Romantic Energy ❤️",
        text:
        "The initials suggest good chemistry and a natural attraction. Both people may enjoy each other's company and share many memorable moments."
    },

    {
        min: 60,
        title: "Something Interesting Is Growing 🌹",
        text:
        "There is potential here. The relationship may grow stronger when both people are honest about their feelings and give each other time."
    },

    {
        min: 50,
        title: "A Curious Connection 💗",
        text:
        "The connection has some interesting possibilities. Friendship, understanding and good communication could bring these two closer."
    },

    {
        min: 0,
        title: "A Journey Yet to Be Written 🌙",
        text:
        "The initials don't reveal everything. Sometimes the strongest relationships are created through shared experiences, kindness and genuine effort."
    }

];


/* ===================================
   CREATE DETERMINISTIC SCORE
=================================== */

function calculateLove(first, second) {

    /*
       This creates a repeatable score.

       The same two initials will produce
       the same prediction every time.
    */

    const a = first.charCodeAt(0);
    const b = second.charCodeAt(0);

    let score =
        ((a * 7) +
        (b * 13) +
        Math.abs(a - b) * 3) % 41;

    score += 60;

    return score;
}


/* ===================================
   GET PREDICTION
=================================== */

function getPrediction(score) {

    for (let prediction of predictions) {

        if (score >= prediction.min) {

            return prediction;

        }

    }

}


/* ===================================
   PREDICT BUTTON
=================================== */

predictBtn.addEventListener("click", () => {

    let first =
        firstInput.value.trim().toUpperCase();

    let second =
        secondInput.value.trim().toUpperCase();


    /* Check inputs */

    if (
        first === "" ||
        second === ""
    ) {

        alert(
            "Please enter both initials ❤️"
        );

        return;

    }


    /* Only letters */

    if (
        !/^[A-Z]$/.test(first) ||
        !/^[A-Z]$/.test(second)
    ) {

        alert(
            "Please enter one English letter for each person."
        );

        return;

    }


    /* Calculate */

    const score =
        calculateLove(first, second);


    const prediction =
        getPrediction(score);


    /* Additional scores */

    const chemistryScore =
        Math.min(
            99,
            score + ((first.charCodeAt(0) + 3) % 7)
        );

    const trustScore =
        Math.min(
            99,
            score - 4 + ((second.charCodeAt(0) + 5) % 9)
        );

    const futureScore =
        Math.min(
            99,
            score + ((first.charCodeAt(0) + second.charCodeAt(0)) % 8)
        );


    /* Display couple */

    couple.textContent =
        `${first} + ${second}`;


    /* Reset result */

    result.classList.add("show");

    percentage.textContent = "0%";

    progressBar.style.width = "0%";


    /* Animate percentage */

    let current = 0;

    const counter = setInterval(() => {

        current++;

        percentage.textContent =
            current + "%";

        if (current >= score) {

            clearInterval(counter);

        }

    }, 20);


    /* Progress */

    setTimeout(() => {

        progressBar.style.width =
            score + "%";

    }, 100);


    /* Prediction */

    predictionTitle.textContent =
        prediction.title;

    predictionText.textContent =
        prediction.text;


    /* Stats */

    chemistry.textContent =
        chemistryScore + "%";

    trust.textContent =
        trustScore + "%";

    future.textContent =
        futureScore + "%";


    /* Scroll to result */

    setTimeout(() => {

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 300);

});


/* ===================================
   ENTER KEY SUPPORT
=================================== */

[firstInput, secondInput].forEach(input => {

    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            predictBtn.click();

        }

    });

});
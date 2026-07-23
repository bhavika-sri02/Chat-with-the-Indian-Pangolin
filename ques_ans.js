//QUESTIONS & ANSWERS DATABASE 

const questions = [
    ["Pangolin, why do you need my help to survive?", "Because I’m endangered and hunted — your awareness can save me!"],
    ["Are you really endangered?", "Yes, I'm facing extinction — mostly because of illegal trade."],
    ["What threats do you face out there?", "Hunters and habitat loss. I'm rarely safe outside now."],
    ["Why do humans hunt you?", "For my meat and scales — both wrongly thought to be medicinal."],
    ["What conservation work is being done for you?", "Some conservation programs and rescues, but we need more support."],
    ["How can I help you survive?", "Spread awareness, support pangolin protection laws, and never buy wildlife products!"],
    ["Why are your scales so valuable to people?", "They believe myths — but there’s no science behind using scales in medicine."],
    ["Is it true you're one of the most trafficked animals?", "Sadly, yes. I need your voice to stop the trafficking."],
    ["Being nocturnal — does that help you stay safe?", "It makes me hard to see, but not safe from human threats."],
    ["Why can’t you escape from danger easily?", "I’m slow and curl up — which works against predators, not poachers."],
    ["How do you eat without teeth?", "I grind my insect meals using strong stomach muscles."],
    ["Why do you curl into a ball?", "It's my natural defense — but it makes me easy to capture."],
    ["Do your scales really protect you?", "From predators, yes. From humans, not so much."],
    ["What happens if you’re taken from the wild?", "I lose my home, my freedom — sometimes my life."],
    ["What role do you play in the ecosystem?", "I eat termites and ants, keeping pest populations in check."],
    ["What’s your diet like?", "Ants and termites — I help protect crops and trees from pests."],
    ["What makes you unique?", "I’m the only mammal covered entirely in scales!"],
    ["Where exactly can I find you in India?", "Forests, grasslands, and farmlands — but I’m shy and elusive."],
    ["Do traditional medicines need your body parts?", "No! There are better alternatives without hurting animals."],
    ["Why should people know about you?", "Because most don’t — and I need their help to survive."],
    ["Are you being rescued and helped right now?", "Yes, by a few groups — but we need more support."],
    ["Tell me something special about your tail or scales.", "They’re made of keratin — like your nails!"],
    ["How does deforestation affect you?", "It pushes me out of my home into dangerous areas."],
    ["What would happen if pangolins disappeared?", "Pests would thrive, and a beautiful, ancient species would be gone."],
    ["Can I be your voice and help spread awareness?", "Please do. Every voice matters — even yours."]
];


// DOM ELEMENTS

const questionList = document.getElementById("question-list");
const answerBox = document.getElementById("answer-box");
const backBtn = document.querySelector(".back-btn");
const infoBox = document.getElementById("info-box");

const mapContainer = document.getElementById("map-container");

const popupVideoContainer = document.getElementById("popup-video-container");
const popupVideo = document.getElementById("popup-video");


//to display questions

function renderQuestions(startIndex = 0, count = 3) {

    questionList.innerHTML = "";

    const end = Math.min(startIndex + count, questions.length);

    for (let i = startIndex; i < end; i++) {

        const button = document.createElement("button");

        button.className = "question-btn";

        button.textContent = questions[i][0];

        button.onclick = () => showAnswer(i);

        questionList.appendChild(button);
    }

    if (end < questions.length) {

        const moreButton = document.createElement("button");

        moreButton.className = "question-btn";

        moreButton.textContent = "Show More Questions";

        moreButton.onclick = () => renderQuestions(end);

        questionList.appendChild(moreButton);
    }
}

//to display answer

function showAnswer(index) {

    const [question, answer] = questions[index];

    questionList.innerHTML = "";

    answerBox.innerHTML =
        `<strong>${question}</strong><br><br>${answer}`;

    answerBox.style.display = "block";

    backBtn.style.display = "inline-block";

    speak(answer);

    const followUps = document.createElement("div");

    followUps.style.marginTop = "20px";

    for (let j = index + 1; j < index + 4 && j < questions.length; j++) {

        const button = document.createElement("button");

        button.className = "question-btn";

        button.textContent = questions[j][0];

        button.onclick = () => showAnswer(j);

        followUps.appendChild(button);
    }

    answerBox.appendChild(followUps);
}


//to reset interface

function resetUI() {

    answerBox.style.display = "none";

    backBtn.style.display = "none";

    renderQuestions();
}


//text to speech conversion 

function speak(text) {

    if ("speechSynthesis" in window) {

        const speech = new SpeechSynthesisUtterance(text);

        speech.pitch = 1;

        speech.rate = 1;

        window.speechSynthesis.cancel();

        window.speechSynthesis.speak(speech);
    }
}


//for info display

function showInfo(text) {

    infoBox.textContent = text;

    infoBox.style.display = "block";

    speak(text);

    setTimeout(() => {

        infoBox.style.display = "none";

    }, 4000);
}

//for map

function toggleMap() {

    const isVisible = mapContainer.style.display === "block";

    mapContainer.style.display = isVisible ? "none" : "block";
}


//for video

function showPopupVideo() {

    popupVideoContainer.style.display = "flex";

    popupVideo.currentTime = 0;

    popupVideo.play();
}

function closePopupVideo() {

    popupVideoContainer.style.display = "none";

    popupVideo.pause();
}


// start app

renderQuestions();
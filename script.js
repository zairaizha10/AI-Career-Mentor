let data = {};
let progress = 0;

fetch("data.json")
    .then(response => response.json())
    .then(json => {
        data = json;
    });

/* =========================
   Typing Animation
========================= */

const typingText = document.getElementById("typing-text");

const text =
    "Discover AI-powered career guidance, personalized learning roadmaps and professional growth opportunities.";

let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 40);
    }
}

typeWriter();

/* =========================
   Dark Mode
========================= */

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});

/* =========================
   Auto Save Profile
========================= */

const fields = ["name", "interest", "skills", "education"];

fields.forEach(field => {

    const element = document.getElementById(field);

    element.value = localStorage.getItem(field) || "";

    element.addEventListener("input", () => {
        localStorage.setItem(field, element.value);
    });

});

/* =========================
   Career Generator
========================= */

document
    .getElementById("generateBtn")
    .addEventListener("click", generateCareer);

function generateCareer() {

    const interest =
        document.getElementById("interest")
        .value
        .trim();

    const careerContainer =
        document.getElementById("careerResults");

    const roadmapContainer =
        document.getElementById("roadmap");

    const resourcesContainer =
        document.getElementById("resources");

    careerContainer.innerHTML = "";
    roadmapContainer.innerHTML = "";
    resourcesContainer.innerHTML = "";

    let matchedKey = null;

    for (let key in data.careers) {

        if (
            interest.toLowerCase() ===
            key.toLowerCase()
        ) {
            matchedKey = key;
            break;
        }
    }

    if (!matchedKey) {

        careerContainer.innerHTML =
            `
            <div class="career-card">
                <h3>No Career Match Found</h3>
                <p>
                Try:
                AI,
                Data Science,
                Web Development,
                Cyber Security,
                Cloud Computing
                </p>
            </div>
            `;

        return;
    }

    /* Career Cards */

    data.careers[matchedKey].forEach(career => {

        const card =
            document.createElement("div");

        card.classList.add("career-card");

        card.innerHTML = `
            <i class="fas fa-briefcase"></i>
            <h3>${career}</h3>
        `;

        careerContainer.appendChild(card);

    });

    /* Roadmap */

    data.roadmaps[matchedKey].forEach((step, i) => {

        const div =
            document.createElement("div");

        div.classList.add("roadmap-step");

        div.innerHTML = `
            <strong>Step ${i + 1}</strong>
            <p>${step}</p>
        `;

        roadmapContainer.appendChild(div);

    });

    /* Resources */

    data.resources[matchedKey].forEach(resource => {

        const div =
            document.createElement("div");

        div.classList.add("resource-card");

        div.innerHTML = `
            <h3>${resource}</h3>
        `;

        resourcesContainer.appendChild(div);

    });

}

/* =========================
   Download Roadmap
========================= */

document
    .getElementById("downloadRoadmap")
    .addEventListener("click", () => {

        const roadmap =
            document
            .getElementById("roadmap")
            .innerText;

        if (!roadmap) {
            alert("Generate a roadmap first.");
            return;
        }

        const blob =
            new Blob([roadmap],
            {
                type: "text/plain"
            });

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;

        a.download =
            "career-roadmap.txt";

        a.click();

    });

/* =========================
   Progress Tracker
========================= */

const progressFill =
    document.getElementById("progressFill");

document
    .getElementById("progressBtn")
    .addEventListener("click", () => {

        if (progress < 100) {

            progress += 20;

            progressFill.style.width =
                progress + "%";
        }

    });

/* =========================
   Animated Counters
========================= */

const counters =
    document.querySelectorAll(".counter");

const speed = 50;

counters.forEach(counter => {

    const updateCounter = () => {

        const target =
            +counter.getAttribute("data-target");

        const count =
            +counter.innerText;

        const increment =
            target / speed;

        if (count < target) {

            counter.innerText =
                Math.ceil(count + increment);

            setTimeout(updateCounter, 30);

        } else {

            counter.innerText = target;

        }

    };

    updateCounter();

});

/* =========================
   AI Chat Assistant
========================= */

document
    .getElementById("sendBtn")
    .addEventListener("click", sendMessage);

function sendMessage() {

    const input =
        document.getElementById("userInput");

    const message =
        input.value.trim();

    if (!message) return;

    const chatBox =
        document.getElementById("chatBox");

    const userDiv =
        document.createElement("div");

    userDiv.classList.add("user-message");

    userDiv.textContent = message;

    chatBox.appendChild(userDiv);

    let response =
        "I'm still learning. Try asking about AI, Data Science, Web Development, Cyber Security, Cloud Computing, internships or roadmaps.";

    const lower =
        message.toLowerCase();

    for (let key in data.chatResponses) {

        if (lower.includes(key)) {

            response =
                data.chatResponses[key];

            break;

        }

    }

    const botDiv =
        document.createElement("div");

    botDiv.classList.add("bot-message");

    botDiv.textContent = response;

    setTimeout(() => {

        chatBox.appendChild(botDiv);

        chatBox.scrollTop =
            chatBox.scrollHeight;

    }, 500);

    input.value = "";

}

/* =========================
   Enter Key Support
========================= */

document
    .getElementById("userInput")
    .addEventListener("keypress", e => {

        if (e.key === "Enter") {

            sendMessage();

        }

    });
// Typing Text Effect for Hero Section
const words = ["Building AI agents", "Deep Learning", "Building AI applications", "Finetuning LLMs", "Machine Learning"];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 60;
const newWordDelay = 2000;
const typingTextSpan = document.querySelector(".typing-text");

function type() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
        typingTextSpan.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingTextSpan.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    let nextDelay = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIdx === currentWord.length) {
        nextDelay = newWordDelay;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        nextDelay = 400;
    }

    setTimeout(type, nextDelay);
}

document.addEventListener("DOMContentLoaded", () => {
    if (words.length && typingTextSpan) setTimeout(type, 500);
});

// Premium Theme Toggle Management
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");

// Initialize theme state from system/localStorage preferences
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("portfolio-theme") || (systemPrefersDark ? "dark" : "light");
document.documentElement.setAttribute("data-theme", savedTheme);
themeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    themeIcon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
});

// Mobile Navigation Drawer Toggle Handler
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show-mobile-menu");
});

// Close mobile menu whenever clicking a nav item
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show-mobile-menu");
    });
});

// Interactive Floating AI Chat Assistant Interface
const openChatBtn = document.getElementById("openChat");
const closeChatBtn = document.getElementById("close-chat");
const chatWidget = document.getElementById("chatWidget");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

let threadId = "session_" + Math.random().toString(36).substring(7);

openChatBtn.addEventListener("click", () => {
    chatWidget.classList.add("active");
    openChatBtn.style.transform = "scale(0)";
    setTimeout(() => openChatBtn.style.display = "none", 200);
});

closeChatBtn.addEventListener("click", () => {
    chatWidget.classList.remove("active");
    openChatBtn.style.display = "flex";
    setTimeout(() => openChatBtn.style.transform = "scale(1)", 50);
});

async function handleSendMessage() {
    const query = chatInput.value.trim();
    if (!query) return;

    // Render User Query Block
    const userDiv = document.createElement("div");
    userDiv.className = "message user";
    userDiv.textContent = query;
    chatMessages.appendChild(userDiv);
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Initialize Streaming Assistant Container
    const botDiv = document.createElement("div");
    botDiv.className = "message bot";
    botDiv.innerHTML = `<span class="typing-loader"></span>`;
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    let fullResponseText = "";
    let firstTokenReceived = false;

    try {
        const response = await fetch("http://localhost:8000/api/chat/stream", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: query, thread_id: threadId })
        });

        if (!response.ok || !response.body) {
            botDiv.textContent = "Error: Could not establish a connection to Amir's portfolio brain infrastructure.";
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const parts = buffer.split("\n\n");
            buffer = parts.pop();

            for (const part of parts) {
                if (!part.startsWith("data: ")) continue;
                const dataStr = part.slice(6).trim();
                if (dataStr === "[DONE]") continue;

                try {
                    const parsed = JSON.parse(dataStr);

                    if (parsed.token) {
                        if (!firstTokenReceived) {
                            botDiv.innerHTML = "";
                            firstTokenReceived = true;
                        }
                        fullResponseText += parsed.token;
                        botDiv.textContent = fullResponseText;
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    } else if (parsed.error) {
                        botDiv.innerHTML = "";
                        botDiv.textContent = "⚠️ " + parsed.error;
                        firstTokenReceived = true;
                    }
                } catch (e) {
                }
            }
        }

        if (!firstTokenReceived) {
            botDiv.textContent = "Namaste, the model stream completed without returning data chunks. Please retry.";
        }
    } catch (error) {
        console.error("Brain API Connection Interrupted:", error);
        botDiv.innerHTML = "";
        botDiv.textContent = "Connection refused. Make sure your FastAPI backend engine is running on port 8000.";
    }
}

sendBtn.addEventListener("click", handleSendMessage);
chatInput.addEventListener("keypress", (e) => { if (e.key === "Enter") handleSendMessage(); });

// Lead Generation Form Handler (FastAPI Post Router Binding)
const hireForm = document.getElementById("hireForm");
const hireStatus = document.getElementById("hireStatus");

hireForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("hireName").value.trim();
    const email = document.getElementById("hireEmail").value.trim();
    const message = document.getElementById("hireMessage").value.trim();
    if (!name || !email || !message) return;

    hireStatus.textContent = "Processing transmission...";
    hireStatus.className = "hire-status";

    try {
        const response = await fetch("http://localhost:8000/api/hire", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });
        const data = await response.json();

        if (response.ok) {
            hireStatus.textContent = "Message processed successfully! Amir will follow up shortly.";
            hireStatus.className = "hire-status success";
            hireForm.reset();
        } else {
            hireStatus.textContent = data.detail || "Failed to submit request parameters.";
            hireStatus.className = "hire-status error";
        }
    } catch (err) {
        hireStatus.textContent = "Network error. Please try again or reach out via standard email.";
        hireStatus.className = "hire-status error";
    }
});
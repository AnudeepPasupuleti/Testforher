async function loadPage(fileName) {
    try {
        const response = await fetch(fileName);
        const html = await response.text();
        document.getElementById('content-area').innerHTML = html;
        document.getElementById('page-overlay').classList.add('active');
        
        if(fileName === 'secret.html') startTimer();
    } catch (error) {
        console.error("Error loading page:", error);
    }
}

function closePage() {
    document.getElementById('page-overlay').classList.remove('active');
    document.getElementById('content-area').innerHTML = ''; 
}

function newLine() {
    const lines = [
        "Is your name Google? Because you have everything I’m searching for.",
        "Do you have a map? I keep getting lost in your eyes.",
        "I’d say God bless you, but it looks like He already did.",
        "Are you a magician? Because whenever I look at you, everyone else disappears."
    ];
    const textEl = document.getElementById('flirt-text');
    if(textEl) {
        textEl.innerHTML = lines[Math.floor(Math.random() * lines.length)];
    }
}

function startTimer() {
    const targetDate = new Date("Jan 28, 2026 00:00:00").getTime();
    const timerEl = document.getElementById("timer");
    if(!timerEl) return;

    const update = () => {
        const diff = targetDate - Date.now();
        if (diff <= 0) { timerEl.innerHTML = "00:00:00"; return; }
        const h = Math.floor((diff / (1000 * 60 * 60)));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        timerEl.innerHTML = `${h}h ${m}m ${s}s`;
    };
    update();
    setInterval(update, 1000);
}

/* script.js */

function createFloatingSymbols() {
    const container = document.getElementById('floating-container');
    const symbolList = ['❤', '∞', '❣', '❤', '∞']; // Your preferred symbols
    const symbolCount = 12; // How many symbols you want on screen

    for (let i = 0; i < symbolCount; i++) {
        const span = document.createElement('span');
        span.classList.add('symbol');
        
        // Randomize Content
        span.innerText = symbolList[Math.floor(Math.random() * symbolList.length)];
        
        // Randomize Horizontal Position (0 to 100%)
        const randomLeft = Math.floor(Math.random() * 100);
        span.style.left = `${randomLeft}%`;
        
        // Randomize Size (15px to 40px)
        const randomSize = Math.floor(Math.random() * 25) + 15;
        span.style.fontSize = `${randomSize}px`;
        
        // Randomize Animation Duration (8s to 18s)
        const randomDuration = Math.floor(Math.random() * 10) + 8;
        span.style.animationDuration = `${randomDuration}s`;
        
        // Randomize Delay so they don't all start at once
        const randomDelay = Math.floor(Math.random() * 15);
        span.style.animationDelay = `${randomDelay}s`;

        container.appendChild(span);
    }
}

/* Update the createSymbols function in script.js */

/* script.js */
function createSymbols() {
    const container = document.querySelector('.floating-container');
    if (!container) return;

    const symbols = ['❤', '∞', '❣', '❤'];
    const count = 18; 

    for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.classList.add('symbol');
        span.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Use vw to ensure they span edge-to-edge
        span.style.left = (Math.random() * 100) + 'vw';
        
        const size = (Math.random() * 20 + 20); 
        const duration = (Math.random() * 10 + 10); 
        const delay = (Math.random() * 20); 

        span.style.fontSize = size + 'px';
        span.style.animationDuration = duration + 's';
        span.style.animationDelay = `-${delay}s`; // Negative delay makes them start scattered immediately

        container.appendChild(span);
    }
}

window.addEventListener('DOMContentLoaded', createSymbols);
// ... keep your other loadPage, startTimer, and closePage functions

// Call this function when the window loads
window.onload = () => {
    createFloatingSymbols();
    // Keep your existing Service Worker registration here
};

// ... keep your existing loadPage, closePage, and startTimer functions below

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

// 1. Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 2. Heart Burst Effect
function createBurst(e) {
    const container = document.body;
    const count = 12; // Number of hearts in the burst
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = '❤';
        heart.classList.add('heart-particle');
        
        // Position at click/tap location
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        // Random travel distance and direction
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 100 + 50;
        heart.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        heart.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        
        container.appendChild(heart);
        
        // Clean up
        setTimeout(() => heart.remove(), 800);
    }
}

// Initialize Theme on Load
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    createSymbols(); // Your existing background hearts
});
// --- 1. CORE NAVIGATION & LOADING ---

async function loadPage(fileName) {
    try {
        const response = await fetch(fileName);
        const html = await response.text();
        document.getElementById('content-area').innerHTML = html;
        document.getElementById('page-overlay').classList.add('active');
        
        // Specific logic for Secret Page
        if(fileName === 'secret.html') {
            startTimer();
            // Check if already unlocked previously
            if (localStorage.getItem('secret_unlocked') === 'true') {
                revealSecret();
            }
        }
    } catch (error) {
        console.error("Error loading page:", error);
    }
}

function closePage() {
    document.getElementById('page-overlay').classList.remove('active');
    document.getElementById('content-area').innerHTML = ''; 
    localStorage.removeItem('secret_unlocked');
}

// --- 2. SECRET PAGE & UNLOCK LOGIC ---

// Event Delegation: This makes the "Unlock" button work even when loaded via fetch
document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'unlock-trigger') {
        openModal()
    }
});


function openModal() {
    const modal = document.getElementById('passcode-modal');
    if(modal) {
        modal.classList.remove('hidden');
        document.getElementById('passcode-input').focus();
    }
}

function closeModal() {
    const modal = document.getElementById('passcode-modal');
    if(modal) modal.classList.add('hidden');
}

function checkPasscode() {
    const input = document.getElementById('passcode-input').value;
    const correctCode = "2428"; // Your code

    if (input === correctCode) {
        // 1. Hide the modal
        closeModal();
        
        // 2. Show the loader
        const loader = document.getElementById('loader-overlay');
        const liquid = document.getElementById('heart-liquid');
        loader.classList.remove('hidden');

        // 3. Start filling slowly (using a tiny timeout to ensure the transition triggers)
        setTimeout(() => {
            liquid.style.height = "100%";
        }, 50);

        // 4. Wait for the filling (3s) + a little extra, then show secret
        setTimeout(() => {
            loader.classList.add('hidden');
            revealSecret();
            // Reset liquid for next time
            liquid.style.height = "0%";
        }, 3500); 

    } else {
        const errorEl = document.getElementById('modal-error');
        errorEl.classList.remove('hidden');
    }
}

function revealSecret() {
    const lockedView = document.getElementById('locked-view');
    const unlockedView = document.getElementById('unlocked-view');
    
    // 1. Set your secret passcode here
    const correctPasscode = "kavya2428"; 


    // 3. Check if it matches
    
        if (lockedView && unlockedView) {
            lockedView.classList.add('hidden');
            unlockedView.classList.remove('hidden');
        }
    
}

function startTimer() {
    const targetDate = new Date("Jan 28, 2026 00:00:00").getTime();
    const timerEl = document.getElementById("timer");
    if(!timerEl) return;

    const update = () => {
        const diff = targetDate - Date.now();
        // If time is up, unlock automatically
        if (diff <= 0) { 
            timerEl.innerHTML = "00:00:00"; 
            revealSecret();
            return; 
        }
        const h = Math.floor((diff / (1000 * 60 * 60)));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        timerEl.innerHTML = `${h}h ${m}m ${s}s`;
    };

    update();
    const timerInterval = setInterval(() => {
        if (!document.getElementById("timer")) {
            clearInterval(timerInterval);
            return;
        }
        update();
    }, 1000);
}

// --- 3. VISUAL EFFECTS (Hearts & Symbols) ---

function createSymbols() {
    const container = document.getElementById('floating-container');
    if (!container) return;
    container.innerHTML = ''; 

    const symbols = ['❤', '∞', '❣', '❤'];
    for (let i = 0; i < 18; i++) {
        const span = document.createElement('span');
        span.classList.add('symbol');
        span.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.left = (Math.random() * 100) + 'vw';
        span.style.fontSize = (Math.random() * 20 + 20) + 'px';
        span.style.animationDuration = (Math.random() * 10 + 10) + 's';
        span.style.animationDelay = `-${Math.random() * 20}s`;
        container.appendChild(span);
    }
}

// Heart Burst Effect on Click
document.addEventListener('click', (e) => {
    // Don't burst if clicking the unlock button to avoid visual clutter
    if(e.target.id === 'unlock-trigger') return;
    
    const count = 12;
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = '❤';
        heart.classList.add('heart-particle');
        heart.style.left = (e.clientX || e.touches?.[0].clientX) + 'px';
        heart.style.top = (e.clientY || e.touches?.[0].clientY) + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 100 + 50;
        heart.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        heart.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
    }
});

// --- 4. THEME & UTILITIES ---

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function newLine() {
    const lines = [
        "Is your name Google? Because you have everything I’m searching for.",
        "Do you have a map? I keep getting lost in your eyes.",
        "I’d say God bless you, but it looks like He already did.",
        "Are you a magician? Because whenever I look at you, everyone else disappears."
    ];
    const textEl = document.getElementById('flirt-text');
    if(textEl) textEl.innerHTML = lines[Math.floor(Math.random() * lines.length)];
}

// --- 5. INITIALIZATION ---

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    createSymbols();
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => console.log("SW error:", err));
}
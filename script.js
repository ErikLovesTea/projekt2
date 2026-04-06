const API_URL = `https://tinkr.tech/sdb/projekt2/db`;

let username = prompt("What is your name?") || "Stranger";

const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');
const statusDiv = document.getElementById('status');

async function loadMessages() {
    try {
        statusDiv.innerText = "Syncing...";
        const response = await fetch(API_URL);
        const messages = await response.json();
        
        chatBox.innerHTML = '';
        
        messages.forEach(item => {
            const div = document.createElement('div');
            div.className = 'message';
            div.innerHTML = `<span class="user">${item.user}:</span><span class="msg-text">${item.text}</span>`;
            chatBox.appendChild(div);
        });

        chatBox.scrollTop = chatBox.scrollHeight;
        statusDiv.innerText = "Live";
    } catch (err) {
        console.error("Failed to load:", err);
        statusDiv.innerText = "Offline";
    }
}

async function postMessage(e) {
    e.preventDefault();
    
    const messageText = msgInput.value.trim();
    if (!messageText) return;

    const payload = {
        user: username,
        text: messageText,
        timestamp: Date.now()
    };

    sendBtn.disabled = true;
    msgInput.value = 'Sending...';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            msgInput.value = '';
            await loadMessages();
        }
    } catch (err) {
        console.error("Error posting:", err);
        alert("Wait a few seconds before sending another message.");
    } finally {
        setTimeout(() => {
            sendBtn.disabled = false;
            if(msgInput.value === 'Sending...') msgInput.value = '';
        }, 2000);
    }
}

chatForm.addEventListener('submit', postMessage);

setInterval(loadMessages, 5000);

loadMessages();

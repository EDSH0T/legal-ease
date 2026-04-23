'use strict';
const fs = require('fs');
const path = require('path');

// Store session file next to server.js (works in Docker and locally)
const SESSION_FILE = path.join(__dirname, '.ecourts-session.json');

function loadSession() {
  try {
    if (fs.existsSync(SESSION_FILE)) {
      const data = JSON.parse(fs.readFileSync(SESSION_FILE, 'utf8'));
      // Expire after 2 hours
      if (data.timestamp && Date.now() - data.timestamp < 7200000) {
        return data.cookies;
      }
    }
  } catch (e) {}
  return null;
}

function saveSession(cookies) {
  try {
    fs.writeFileSync(SESSION_FILE, JSON.stringify({ cookies, timestamp: Date.now() }));
  } catch (e) {}
}

function clearSession() {
  try {
    if (fs.existsSync(SESSION_FILE)) fs.unlinkSync(SESSION_FILE);
  } catch (e) {}
}

module.exports = { loadSession, saveSession, clearSession };

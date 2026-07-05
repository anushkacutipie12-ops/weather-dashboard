# Weather Dashboard (Work in Progress)

Day 1: basic API connection test. UI and styling come later.

## Setup

1. Get a free API key from https://openweathermap.org/api
2. Copy `config.example.js` to `config.js`
3. Paste your key into `config.js`
4. Open `index.html` in your browser
5. Open the browser console (F12) to see the weather data logged

## Note on API keys

This is a frontend-only project, so the API key is visible to anyone
who inspects the network requests in their browser - that's normal and
fine for a free-tier learning project. `config.js` is still gitignored
so it doesn't end up in your public commit history by mistake.

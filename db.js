const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'db.json');

// Helper to read DB
const readDb = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { news: [], videos: [], gallery: [], artists: [], awards: [], culture: [], innovation: [], lifestyle: [] };
    }
};

// Helper to write DB
const writeDb = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readDb, writeDb };

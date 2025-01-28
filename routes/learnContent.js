var express = require('express');
var router = express.Router();
const mysql = require('mysql');

// Database connection
const Connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'linuxhub'
});

// Promisify query function
const query = (sqlQuery) => new Promise((resolve, reject) => {
    Connection.query(sqlQuery, (err, results) => {
        if (err) reject(err);
        else resolve(results);
    });
});

/* GET users listing. */
router.get('/:type?', async (req, res) => {
    try {
        const cards = await query(`SELECT * FROM learncontent`);
        console.log(cards)
        const list = cards.map(card => 
            `<learn-card img="${card.img}" title="${card.title}" lang="${card.lang}" type="${card.etype}" link="${card.link}"></learn-card>`
        ).join('\n');
        console.log(req.params.type)
        // Render the EJS template
        res.render('learnContent', {
            title: req.params.type || 'Learn',
            list
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

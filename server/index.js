const express = require("express");
const cors = require('cors');
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const app = express();

const db_name = path.join(__dirname, "data", "db.sqlite");
const db = new sqlite3.Database(db_name, err => {
    if (err)
        return console.log(err.message);
    console.log("Successfully connected to database");
});

app.use(cors());
app.listen(8081, () => {
    console.log("Serveur démarré (http://localhost:8081/) !");
});

app.get("/", (req, res) => {
    res.send("Bonjour le monde...");
});

app.get("/users", (req, res) => {
    console.log("/users");
    const sql = "SELECT * FROM users ORDER by id";
    db.all(sql, [], (err, rows) => {
        if (err)
            return console.error(err.message);
        res.json(rows);
    });
});

app.get("/users/:userName", (req, res) => {
    console.log("/users/:userName");
    console.log(req.params);
    const userName = req.params.userName;
    const sql = "SELECT * FROM users WHERE userName = ?";
    db.get(sql, userName, (err, row) => {
        if (err)
            return console.error(err.message);
        res.json(row);
    });
});

app.post("/users/deleteAccount/:userName", (req, res) => {
    console.log("/users/deleteAccount/:userName");
    console.log(req.params);
    const userName = req.params.userName;
    const sql = "UPDATE users SET isDeleted = TRUE WHERE userName = ?";
    db.run(sql, userName, (err, row) => {
        if (err)
            return console.error(err.message);
        console.log(row);
        res.sendStatus(200);
    });
});

app.get("/messages/:userId", (req, res) => {
    console.log("/messages/:userId");
    const userId = req.params.userId;
    const messages = "SELECT * FROM messages WHERE receiverId = ? OR senderId = ?";
    db.all(messages, [userId, userId], (err, row) => {
        if (err)
            return console.error(err.message);
        res.json(row);
    });
});

app.get("/media/:userId", (req, res) => {
    console.log("/media/:userId");
    const userId = req.params.userId;
    const media = "SELECT * FROM media WHERE userId = ?";
    db.all(media, userId, (err, row) => {
        if (err)
            return console.error(err.message);
        res.json(row);
    });
});
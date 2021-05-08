const express = require("express");
const app = express();
const path = require("path");

const api = require("./server/api.js")
// webpack hmr

// static assets
app.use(express.static("dist"));

app.use('/assets', express.static('assets'))

// main route
app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "./dist/index.html"))
);

app.get('/api/searchItems', function(req, res) {
    if (!req.query.like) {
        res.end();
        return
    }
    var str = req.query.like
    var limit = 100
    if (req.query.lim)
        limit = parseInt(req.query.lim)
    res.setHeader('Content-Type', 'application/json');
    api.searchItems(str, limit, function(results) {
        res.send(results)
    })
})

app.get('/api/searchMonsterNames', function(req, res) {
    if (!req.query.like) {
        res.end();
        return
    }
    var str = req.query.like
    var limit = 100
    if (req.query.lim) {
        limit = parseInt(req.query.lim)
    }
    res.setHeader('Content-Type', 'application/json');
    api.searchMonsterNames(str, limit, function(results) {
        res.send(results)
    })
})

app.get('/api/getMonstersByName', function(req, res) {
    if (!req.query.name) {
        res.end();
        return;
    }
    var name = req.query.name
    res.setHeader('Content-Type', 'application/json');
    api.getMonstersByName(name, function(results) {
        res.send(results)
    })
})
// app start up
app.listen(3000, () => console.log("App listening on port 3000!"));
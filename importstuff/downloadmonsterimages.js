const fs = require('fs')
const csv = require('csv-parser')
const db = require('../server/database.js')
const sql = "select count(*) as count from rsitems.image where imageName = ?"

const request = require('request');
const baseUrl = 'https://oldschool.runescape.wiki/w/Special:Redirect/file?wpvalue='


function download(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


class ImageHandler {
    constructor() {
        this.imageQueue = []
        this.running = false
    }

    addQueue(img) {
        if (!this.imageQueue.includes(img)) {
            this.imageQueue.push(img);
        }
        this.runQueue();
    }

    insertImageDb(name, path, callback) {
        const insertSql = "insert into rsitems.image (imageName, localPath) values (?, ?)";
        db.con.query(insertSql, [name, path], callback)
    }

    runQueue() {
        if (!this.running && this.imageQueue.length > 0) {
            this.running = true;
            const name = this.imageQueue[0]
            console.log('downloading', name, "; queueLength:", this.imageQueue.length)
            const path = './assets/monster_images/' + name
            download(baseUrl + name, '.' + path, () => {
                this.insertImageDb(name, path, (err, res) => {
                    err ? console.log(err) : null;
                    this.imageQueue.shift()
                    this.running = false;
                    if (this.imageQueue.length > 0) {
                        this.runQueue()
                    }
                })
            })
        }
    }

}

var handler = new ImageHandler();



fs.createReadStream('monster stats - 2021-03-20 monster stats.csv')
    .pipe(csv())
    .on('data', (row) => {
        var filename = row.image
        filename = filename.replace("[[File:", "")
        filename = filename.replace("]]", "")
        filename = filename.split('|')[0]
        db.con.query(sql, filename, (err, res) => {
            if (res[0].count < 1) {
                filename && handler.addQueue(filename);
            }
        })
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
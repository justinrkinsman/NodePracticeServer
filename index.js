const http = require('http')
const path = require('path')
const fs = require('fs');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : `${req.url}.html`)
    
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(content, 'utf8')
                })
            }else {
                // Some server error
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(content, 'utf8')
        }
    })

}).listen(8080);

/*
    // Load index.html
    if (req.url === '/' || req.url === '/home') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) throw err
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(content)
        })
    }

    // Load about.html
    if (req.url === '/about') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
            if (err) throw err
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(content)
        })
    }

    // Load contact-me.html
    if (req.url === '/contact') {
        fs.readFile(path.join(__dirname, 'public', 'contact-me.html'), (err, content) => {
            if (err) throw err
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(content)
        })
    }

    // Load 404.html
    if (req.url === '/404') {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
            if (err) throw err
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end(content)
        })
    }*/
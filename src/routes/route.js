const express = require('express');
const url = require('./../controller/urlsController')
let router = express.Router();

router.post("/url/shorten", url.create)

// router.get("/sdfg", (req, res) => {
//     res.writeHead(301, { "Location": "http://google.com/" });
//     res.end()
// })


module.exports = router;
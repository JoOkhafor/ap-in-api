const express = require("express")

const errors = express()

// error handling
errors.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// handle 404 error
errors.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 491;
    next(err);
});


// handle errors
errors.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});

module.exports = errors
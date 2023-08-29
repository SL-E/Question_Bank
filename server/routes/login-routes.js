// login routes

const express = require("express");
const router = express.Router();

const svgCaptcha = require('svg-captcha');
const { v1: uuidv1 } = require('uuid');

// Whenever navigate to ANY page, make the "user" session object available to the
// Handlebars engine by adding it to res.locals.
router.use(function (req, res, next) {
    // res.locals.user = req.session.user;
    next();
});

// generate verification code

router.get("/cap", function (req, res) {
    const captcha = svgCaptcha.create({
        size: 4,
        fontSize: 45,
        noise: 1,
        width: 120,
        height: 36,
        color: true,
        background: '#ccc'
    })

    req.session.verifyCode = captcha.text
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(String(captcha.data));

});

// / Whenever we navigate to /login, if we're already logged in, redirect to "/".
// // Otherwise, render the login view
router.get("/login", function (req, res) {
    res.locals.login= true;
    res.locals.title = "Login";
    res.locals.urlGoogle = url;

    if (req.session.user) {
            res.redirect("/");
    } else {
        res.locals.message = req.query.message;
        res.render("login");
    }

});

// Whenever POST to /register, login.
router.post("/login", async function (req, res) {
    const { userName, passWord } = req.body || {};
    const teachersModel = req.options.models.teachers;
    try {console.log(111, teachersModel)
        // find user 
        const result = await teachersModel.findOne({ where: { email: userName, password: passWord } })  
        console.log(result)
        if(!result){
            throw new Error('login fail')
        }
        if(!req.session.users){
            req.session.users = []
          }
        req.session.users.push(userName);
        res.send({
            success: true,
            data: result
        })
    } catch (error) {
        res.send({
            success: false,
            data: error
        })
    }
});

// logout
router.post("/loginout", async function (req, res) {
    const { email } = req.body;
    const idx = req.session.users ? req.session.users.findIndex((item) => item === email) : -1;
    if(idx !== -1){
       req.session.users.splice(idx, 1);
    }
    return res.send({ success: email && req.session.users.findIndex((item) => item === email) === -1 })
});

router.get("/oauth2callback",  async function (req, res) {

    // get code
    const code = req.query.code
    console.log(code);

    // get token
    const {tokens} = auth.getToken(code)
    auth.setCredentials(tokens);
    console.log(tokens);

});

module.exports = router;
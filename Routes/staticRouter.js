const express = require("express");
const router = express.Router();
const URL = require("../Models/url"); 
const {checkForAuthentication, restrictTo } = require("../middleware/auth");

router.get('/admin/urls', restrictTo(['ADMIN']),async (req,res) =>{
    const allurls = await URL.find({})
    return res.render("homepage",{
        urls : allurls,
    })
}
    )

router.get('/', checkForAuthentication, restrictTo(["NORMAL","ADMIN"]), async (req,res) =>{
    const allurls = await URL.find({createdBy : req.user._id })
    return res.render("homepage",{
        urls : allurls,
    })
})

router.get("/signup", (req,res) =>{
    return res.render(`signup`)
})

router.get("/login", (req,res) =>{
    return res.render("login");
})


module.exports = router;
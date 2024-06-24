const express=require("express");
const router=express.Router();
const User=require("../modules/users.js");
const wrapAsync=require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users");

router
    .route("/signup")
    .get(userController.rendersignup)
    .post(wrapAsync(userController.signup));



router
.route("/login")
    .get(userController.renderlogin)
    .post(
        saveRedirectUrl,
        passport.authenticate("local",{
            failureFlash:true,
            failureRedirect:"/login",
        }),wrapAsync(userController.login)
    );

router.get("/logout",)
module.exports=router;
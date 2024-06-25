const Listing=require("../modules/listing.js");
const Review=require("../modules/review.js");
const User=require("../modules/users");


module.exports.rendersignup=(req,res)=>{
    res.render("users/signup");
};
module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust! ");
       res.redirect("/listings");


    })
    }catch(e){
        req.flash("error","User is already Exist!!!");
        res.redirect("/signup");
    }
    
};

module.exports.renderlogin=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome to WanderLust! You Are Logged In");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
};


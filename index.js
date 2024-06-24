const dotenv = require('dotenv');
if(process.env.NODE_ENV != "production"){
  dotenv.config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./modules/listing.js");
const port = 8080;
const path = require('path');
var methodOverride = require('method-override')
const ejsMate=require("ejs-mate");
// const wrapAsync=require("./utils/wrapAsync");
const url = 'mongodb://127.0.0.1:27017/wanderlust';
const ExpressError=require("./utils/ExpressError");
// const { listingSchema, reviewSchema}=require("./schema.js");
// const Review=require("./modules/review");
const User=require("./modules/users.js");

const listingRouter=require("./routes/listings.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

const session=require("express-session");
const flash=require("connect-flash");
const passport = require("passport");

const LocalStrategy=require("passport-local");


async function main() {
  try {
    await mongoose.connect(url);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Failed to connect to DB:", err);
  }
}

main();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOption={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  },
}

app.get("/", (req, res) => {
  res.send("Working");
});

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.CurrUser=req.user;
  next();
});



app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found"));
})
// app.use((err,req,res,next)=>{
//   let {statusCode=500,message="some thing is wrongs"}=err;
//   res.status(statusCode).json({ error: message });
//   // res.status(statusCode).render("listings/Error",{message,err});
//   // res.status(statusCode).send(message);
// })
// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging purposes

  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err); // Let the default error handler deal with it
  }

  // Set appropriate status code and send error response
  res.status(err.status || 500);
  res.json({ error: err.message });
});


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});


const express = require("express");
const app = express();
// const users = require("./routes/users.js");
// const posts = require("./routes/posts.js");
// const cookieParser = require("cookie-parser");
const flash=require("connect-flash");
const session=require("express-session");
const path=require("path"); 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOption={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
next();
})

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    // console.log(req.session.name);
    if(name="anonymous"){
        req.flash("error","user not registered");
    }else{
        req.flash("success","user registered successfully");
    }
   
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{

    res.render("page.ejs", {name:req.session.name});
})
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
   
//     res.send(`You Sent a Request ${req.session.count} times`);
// });

///////////////////////
// app.get("/test",(req,res)=>{
//     res.send("Test Succesfull!");
// })
////////////////////////
// app.use(cookieParser("secretcoded"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-In","Us",{signed:true});
//     res.send("Signed Cookie Sent");
// });

// app.get("/verify",(req,res)=>{
//     // console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "namsate");
//     res.cookie("madeIn", "India");
//     res.send("Sent you Some Cookies!");
// });

// app.get("/greet", (req, res) => {
//     let { name = "anonymous" } = req.cookies;
//     res.send(`Hii , ${name}`);
// });

// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hii , I am Root !");
// });

// app.use("/users", users);
// app.use("/posts", posts);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

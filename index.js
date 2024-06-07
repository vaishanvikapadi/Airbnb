const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./modules/listing.js");
const port = 8080;
const path = require('path');
var methodOverride = require('method-override')
const ejsMate=require("ejs-mate");

const url = 'mongodb://127.0.0.1:27017/wanderlust';

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

app.get("/", (req, res) => {
  res.send("Working");
});

app.get("/listings", async (req, res) => {
  
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  
});

//New Route
app.get("/listings/new",(req,res)=>{
  res.render("listings/new");
})

//show routee

app.get("/listings/:id",async(req,res)=>{


    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });

    // let { id } = req.params;
    // const listing = await Listing.findById(id);
    // res.render("listings/show", { listing });
   
});

//Create Route

app.post("/listings",async(req,res)=>{
  let newListing=new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
})

//edit Route

app.get("/listings/:id/edit",async(req,res)=>{
  let{ id } =req.params;
  const listing=await Listing.findById(id);
  res.render("listings/edit.ejs",{ listing });
});

// Update Route 

app.put("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);

})

//DELETE Route

app.delete("/listings/:id",async (req,res)=>{
  let {id}=req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

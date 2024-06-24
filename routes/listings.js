const express = require("express");
const router = express.Router();
const ExpressError=require("../utils/ExpressError");
const { listingSchema, reviewSchema}=require("../schema.js");
const wrapAsync=require("../utils/wrapAsync");
const Listing=require("../modules/listing.js");
const {isloggedIn,isOwner,validateListings}=require("../middleware");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    // validateListings
    isloggedIn,upload.single('listing[image]'),wrapAsync(listingController.createListing)
  );
  // .post(upload.single('listing[image]'),(req,res)=>{
  //   res.send(req.file);
  // })

//New Route
router.get("/new",isloggedIn,wrapAsync(listingController.renderNewForm));


router
  .route("/:id")
  .get(wrapAsync(listingController.showlisting))
  .put(isloggedIn,isOwner,upload.single('listing[image]'),
  // validateListings,
  wrapAsync(listingController.updatelisting))
  .delete(isloggedIn,isOwner,wrapAsync(listingController.deleteListing)); 



//edit Route

router.get("/:id/edit",isloggedIn,isOwner,wrapAsync(listingController.editlisting));
// Error handling middleware




module.exports=router;

const express=require("express");
const router=express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError");
const { listingSchema, reviewSchema}=require("../schema.js");
const Review=require("../modules/review");
const wrapAsync=require("../utils/wrapAsync");
const Listing = require("../modules/listing.js");
const {isloggedIn,isOwner,validateReview,isReviewAuthore}=require("../middleware");

const reviewController=require("../controllers/reviews.js");

//Review 
  router.post("/", validateReview,isloggedIn, wrapAsync(reviewController.creatReview));
  
router.delete("/:reviewId",
  isloggedIn,
  isReviewAuthore,
    wrapAsync(reviewController.destoryReview));

  module.exports=router;
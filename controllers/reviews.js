const Listing=require("../modules/listing.js");
const Review=require("../modules/review.js");
module.exports.creatReview=async (req, res) => {
    const listingId = req.params.id;
    console.log(`Received listing ID: ${listingId}`); // Debug statement
    let listing = await Listing.findById(listingId);
  
    if (!listing) {
      console.error(`Listing with ID ${listingId} not found`); // Debug statement
      return res.status(404).send("Listing not found");
    }
  
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    
    await newReview.save();
    await listing.save();
  
    console.log(`Review added to listing with ID ${listingId}`);
     // Debug statement
     req.flash("success","New Review Add SuccessFull!");
    res.redirect(`/listings/${listing._id}`);
  };

  module.exports.destoryReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    
    req.flash("success","Review Deleted Successfully!");
    res.redirect(`/listings/${id}`);

};
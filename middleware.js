const Listing=require("./modules/listing");
const Review=require("./modules/review");
const ExpressError=require("./utils/ExpressError.js");
// const {listingSchema}=require("./schema.js");
const { listingSchema, reviewSchema}=require("./schema.js");
module.exports.validateListings=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map(el=>el.message).join(",");
      throw new ExpressError(400,error,errMsg);
    }else{
      next();
    }
  
  }

module.exports.isloggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirect=req.originalUrl;
        req.flash("error","You must be logged in to create listings");
        return res.redirect("/login");
      }
      next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
  let listing=await Listing.findById(id);
  if(!listing.owner.equals(res.locals.CurrUser._id)){
    req.flash("error","You don't have permission to edit");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map(el=>el.message).join(",");
    throw new ExpressError(400,error,errMsg);
  }else{
    next();
  }

}

module.exports.isReviewAuthore=async(req,res,next)=>{
  let {id,reviewId}=req.params;
let review=await Review.findById(reviewId);
if(!review.author.equals(res.locals.CurrUser._id)){
  req.flash("error","You not Authore of this Review");
  return res.redirect(`/listings/${id}`);
}
next();
}

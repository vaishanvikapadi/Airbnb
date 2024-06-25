const Listing=require("../modules/listing");
const { listingSchema, reviewSchema}=require("../schema.js");
const ExpressError = require('../utils/ExpressError');
module.exports.index=async (req, res) => {
  
    const allListings = await Listing.find();
    // console.log(allListings);
    res.render("listings/index.ejs", { allListings });
    
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
  };

  module.exports.showlisting=async(req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
      path:"reviews",
      populate:{
        path:"author",
      }
    })
    .populate("owner");
    if(!listing){
      req.flash("error","Listing You Requested for does nor exist !");
      re.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing=async(req,res,next)=>{
  
    let url=req.file.path;
    let filename=req.file.filename;
   
    console.log(url, "..", filename);

    // // Create and save the new listing
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } 
 


 module.exports.editlisting=async(req,res)=>{

    let{ id } =req.params;
    const listing=await Listing.findById(id);
    if(!listing){
      req.flash("error","listing you request for does not exist");
      res.redirect("/listings");
    }

    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{ listing ,originalImageUrl});
  };

  module.exports.updatelisting=async(req,res)=>{
  

    try {
      const { id } = req.params;
      const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
  
      if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
      }
  
      if (req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
      }
  
      req.flash("success", "Listing updated successfully!");
      res.redirect(`/listings/${id}`);
    } catch (error) {
      next(error);
    }
  };

  module.exports.deleteListing=async (req,res)=>{
    let {id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    // if(!listing){
    //   req.flash("error","Listing You Requested for does nor exist !");
    //   re.redirect("/listings");
    // }
    res.redirect("/listings");
  };
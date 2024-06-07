const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename: String,
        url: {
            type: String,
            default: "https://as2.ftcdn.net/v2/jpg/05/31/51/15/1000_F_531511537_5BWggIU904hk1l7rgI2oVGFDbJtv8ZM4.jpg",
           
        }
    },
    price:Number,
    location:String,
    country:String,
});

// Adding a pre-save hook to handle the default URL if it's an empty string
listingSchema.pre('save', function(next) {
    if (this.image && this.image.url === "") {
        this.image.url = "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
    }
    next();
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

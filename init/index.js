const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../modules/listing.js");

const url='mongodb://127.0.0.1:27017/wanderlust';

main()
.then(()=>{
    console.log("Connect To DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(url);
}
//
const initDB=async()=>{
    //await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data Was Initialized ..");
}

initDB();
    
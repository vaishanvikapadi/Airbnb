const express=require("express");
const router=express.Router();
//Index Route
router.get("/",(req,res)=>{
    res.send("Hello ! I am Root");

})

// new Route
router.get("/:id",(req,res)=>{
    res.send("Here create Your User"); 
});

//POST-users
router.post("/:id",(req,res)=>{
    res.send("Update");
    
})
//DELETE-users
router.delete("/:id",(req,res)=>{
    res.send("Delete");
    
})

module.exports=router;
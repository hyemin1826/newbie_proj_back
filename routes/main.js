var express=require('express');
var router=express.Router();
var User=require("/home/juhyemin/newbie_proj/newbie_proj_back/models/user"); //user schema

router.get("/", (req, res, next)=>{
    console.log("this is main window");
    //var sess=req.session;
    //var username=sess.username;
    //console.log(username);

    var username="ju";
    res.json([
        {id: 1,
         username: username}
    ]);
    

});

module.exports=router;

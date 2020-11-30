var express=require('express');
var passport=require("passport");
var router=express.Router({mergeParams:true});
var User=require("mongoose").model("User"); //user schema
var app=express();
const bodyParser=require('body-parser');
const { db } = require('../models/user');

router.post('/', async (req,res,next)=>{ //req: {username, total, board:{index:{habitname, record:[[날짜, 요일, check]...]}}}
    console.log("backedn board");

    var username=req.body.username;
    var habit_list=req.body.board;
    console.log(req.body.board);    

    var info=req.body;
   //mongodb: {username, password, habit:{1:{}, 2:{}}}
    try{
       //const user=await User.findOne({username:username});
       await User.update({'username':username}, {'habit':habit_list});
       console.log("update user habit!");
       res.send(info);
   }
    catch(error){
        console.log("fail to save data")
       res.send(error);
   }
    
})



module.exports=router;
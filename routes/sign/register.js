var express=require('express');
var passport=require("passport");
var router=express.Router();
var User=require("../../models/user"); //user schema
var app=express();
const bodyParser=require('body-parser');
const day_list=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

router.post("/", (req, res, next)=>{ //{usrename, password, password2}
    console.log("register");
    let body=req.body;
    var username=body.username;
    var password=body.password;
    var password2=body.password2;
    //console.log("username: "+username+", pw: "+password);
    
    var today=new Date();
    var today_date=today.toLocaleDateString(); //오늘 연도.월.날짜
    var today_day=day_list[today.getDay()]; //string 
    var yesterday_day=day_list[today.getDay()-1]; //string

    User.findOne({username:username}, (err, user)=>{
        var register_info={'isValid':1, 'error':""};
        if (err) {
            register_info.isValid=0;
            register_info.error=err;
            return next(err);
        }
        if (user){
            console.log("이미 존재하는 ID");
            register_info.isValid=0;
        }
        if (password!=password2){
            console.log("비밀번호 다름");
            register_info.isValid=0;
        }
        console.log("새 유저가 등록됩니다.");  
        var newbie=new User({
            username:username,
            password:password,
            habit:{1:{'name':"기상 후 스트레칭", 'record':[[today_date, today_day, 0], ["","",0]]}}
        });
        console.log(newbie);
        
        //새 유저 저장 to mongodb
        newbie.save(function(err, result){
            console.log(register_info);
            if (err) {
                register_info.error=err;
                res.send(JSON.stringify(register_info));
            }
            else{
                console.log(result);
                res.send(JSON.stringify(register_info));
            }
        });
    });
}, passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect: "/register",
    failureFlash:true
}));

//실패하는 경우는 성공, 다만 성공 경우가 안됨 ㅠㅠ
module.exports=router;
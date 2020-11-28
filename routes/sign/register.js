var express=require('express');
var passport=require("passport");
var router=express.Router();
var User=require("/home/juhyemin/newbie_proj/newbie_proj_back/models/user"); //user schema
var app=express();
const bodyParser=require('body-parser');

/*
router.get('/', (req, res, next)=>{
    res.json([{
        registerok:1
    }])
    //res.render("register.html");
})
*/
router.post("/", (req, res, next)=>{
    //console.log("Register.js!!!");
    let body=req.body;
    var username=body.username;
    var password=body.password;
    var password2=body.password2;
    console.log("username: "+username+", pw: "+password);
    
    User.findOne({username:username}, (err, user)=>{
        console.log("here");
        if (err) {return next(err);}
        if (user){
            console.log("이미 존재하는 ID");
            console.log(user);
            req.flash("error", "사용할 수 없는 ID입니다.");
            return res.redirect("/register");
        }
        //pw==pw2
        if (password!=password2){
            console.log("비밀번호 다름");
            req.flash("error", "비밀번호가 다릅니다.");
            return res.redirect("/register");
        }
        console.log("새 유저가 등록됩니다.");  
        var newbie=new User({
            username:username,
            password:password,
            habit:[]
        });
        
        //새 유저 저장 to mongodb
        newbie.save(function(err, result){
            if (err) {
                res.send(err);
            }
            else{
                console.log(result);
                req.session.User=result;
                res.send({"code":200, "message":"record inserted seuccessfully"});
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
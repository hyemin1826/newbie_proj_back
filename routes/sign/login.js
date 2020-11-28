var express=require('express');
var passport=require("passport");
var router=express.Router();
var User=require("/home/juhyemin/newbie_proj/newbie_proj_back/models/user"); //user schema
var app=express();
const bodyParser=require('body-parser');

router.get('/', (req, res)=>{
    var user_info=null;
    if (!req.user){user_info=[]}
    else{user_info=JSON.parse(JSON.stringify(req.user));}
    res.json(user_info);
})

router.post("/", (req,res, next)=>{
    console.log(req.body);
    //console.log("This is for login!");
    //var sess=req.session;
    //sess.username=req.body.username;
    
    var errors={};
    var valid=true;

    if (!req.body.username){
        console.log("id blank");
        errors.username="ID is blank!";
        valid=false;
    }
    if (!req.body.password){
        console.log("pw is blank");
        errors.password="PW is blank!";
        valid=false;
    }

    if (valid){
        next(); //for authentication
    }
    else{
        console.log("fail to log");
        //req.flash('errors', errors);
        //res.redirect('/login');
        res.send(JSON.parse(JSON.stringify({})));
    }
},
passport.authenticate('login', function(err, user, info){
    if (err) return next(err);
    if (user){
        //var json=JSON.parse(JSON.stringify(user));
        var login_info={'username':user.username, 'isLogin':1, 'habit':user.habit};
        var json=JSON.parse(JSON.stringify(login_info));
        
        req.login(user, function(err){
            if (err) return next(err);
            return res.send(json);
        });
    } else {res.send([]);}
}));

router.get('/logout', (req,res)=>{
    //session destroy 추가

    req.logout(); //passport 제공 함수
    res.redirect('/');
})

/*
passport.authenticate("login", function(err,user,info) {
    if (err) {return next(err);}
    if (!user){return res.redirect('/login')}
    req.logIn(user, function(err){
        if (err) {return next(err)}
        return res.redirect("/users/"+user.id);
    });
})(req,res,next);
});
*/
//실패하는 경우는 성공, 다만 성공 경우가 안됨 ㅠㅠ
module.exports=router;
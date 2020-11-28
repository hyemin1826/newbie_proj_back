var passport = require("passport");
var User = require("../models/user");
var LocalStrategy = require("passport-local").Strategy;

//사용자 정보 -> 세션 저장
passport.serializeUser(function(user,done){
    done(null,user.username);
});
//인증 후 페이지 접근시마다 사용자 정보 읽어오기.
passport.deserializeUser(function(username,done){
    User.findById(username,function(err,user){
        done(err,user);
    });
});

passport.use("login", new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback:true
    },
    function(req, username,password,done){
        console.log("in setduppassport.js");
        User.findOne({username:username}, function(err,user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null,false,{message:"No user has that id!"});
            }

            var valid=user.checkPassword(password);
            console.log("login success? : "+valid);
            if (valid){
                
                done(null, user);
            }
            else {
                done(null, false, {message:'Incorrect Passowrd.'});
            }
        /*
        var valid=user.checkPassword(user_pw){
            console.log("i wanna check my password is correct");
            if(err){return done(err);}
            if(correct){
                return done(null,user);
            }
            return done(null,false,{message:"Invalid password."});
        });
        */ 
    });
}));

 
module.exports=passport;
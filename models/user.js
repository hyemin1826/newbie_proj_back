var mongoose=require('mongoose');
//var bcrypt=require('bcrypt-nodejs');
//var SALT_FACTOR=10;

var userSchema=mongoose.Schema({
    //name:{type:String},
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    habit: {type:Array, required:true}
});

var noop=function(){};

userSchema.pre("save", function(done){
    console.log("save");
    var user=this;
    console.log(user);
    if (!user.isModified("pw")){
        return done(); //async 함수 끝났다고 알려주는 callback 함수
    }
})

userSchema.methods.checkPassword=function(input){
    console.log("checkpassword");
    //console.log(this);
    //console.log("this.password =="+this.password);
    if (input==this.password){
        console.log("correct password!");
        return true;
    }
    else{
        return false;    }
};
/*
userSchema.pre("save", function(done){
    console.log("models");
    var user=this;
    if (! user.isModified("pw")){
        return done(); //async 함수 끝났다고 알려주는 callback 함수
    }
    bcrypt.genSalt(SALT_FACTOR, (err, salt)=>{
        if (err){
            return done(err);
        }
        bcrypt.hash(user.pw, salt, noop, (err, hashedpw)=>{
            if (err) return done(err);
            user.pw=hashedpw;
            done();
        });
    });
});

userSchema.methods.checkPassword= (input, done)=>{
    bcrypt.compare(input, this.pw, (err, right)=>{
        done(err, right);
    });
};
*/
var User=mongoose.model("User", userSchema);
module.exports=mongoose.model("User", userSchema);
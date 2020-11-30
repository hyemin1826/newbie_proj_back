var mongoose=require('mongoose');
//var bcrypt=require('bcrypt-nodejs');
//var SALT_FACTOR=10;

var userSchema=mongoose.Schema({
    //name:{type:String},
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    habit: {type:Object, required:true}
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
    console.log("check_password");
    if (input==this.password){
        console.log("correct password!");
        return true;
    }
    else{
        console.log("비번 틀림");
        return false;    }
};

var User=mongoose.model("User", userSchema);
module.exports=mongoose.model("User", userSchema);
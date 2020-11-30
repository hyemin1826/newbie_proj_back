var express = require('express');
var app = express();
var cors=require('cors');
var setUpPassport=require('./config/setuppassport');
var passport=require('passport');
var mongoose=require('mongoose');

var mainRouter = require('./routes/main');
var loginRouter = require('./routes/sign/login');
var registerRouter = require('./routes/sign/register');
var boardRouter = require('./routes/board');

const bodyParser=require('body-parser');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/habits", {
  useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true
});
const db=mongoose.connection;
db.once("open", ()=>{
    console.log("Connected to DB");
})

app.use(cors());
app.use(express.json({
  type:['application/json', 'text/plain']
}))
app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
  res.locals.isAuthenticated=req.isAuthenticated();
  res.locals.currentUser=req.user;
  next();
})

app.use('/main', mainRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/board', boardRouter);

const port = 8000;

app.listen(port, () => console.log(`listening on port ${port}!`));

module.exports=app;
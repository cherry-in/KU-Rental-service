const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        
    },
    role: {
      type: String,
      default:'user',
    },
    answer:{
      type: String,
    },
    question: {
      type: String,
    },
  
    id: {
        type: Number,
        required: true,
    },
    
});

userSchema.pre("save", function (next) {
  let user = this; //User모델 자체를 가르킴.

  //model 안의 paswsword가 변경 또는 생성될 때 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


module.exports = mongoose.model('User', userSchema);
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: function(v, next) {
        if (this.isNew) {
          User.findOne({username: v}, (err, user) => {
            if (user) {
              next(false);
            }
            next(true);
          });
        } else {
          cb(true);
        }
      },
      message: 'Already taken!'
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: function(v, next) {
        if (this.isNew) {
          User.findOne({email: v}, (err, user) => {
            if (user) {
              next(false);
            }
            next(true);
          });
        } else {
          cb(true);
        }
      },
      message: 'Already taken!'
    }
  },
  password: {
    type: String,
    required: true
  },
}, { 
  toObject: { 
    transform: function (doc, ret) {
      delete ret.password;
    }
  }, 
  toJSON: { 
    transform: function (doc, ret) {
      delete ret.password;
    } 
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  next();
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;

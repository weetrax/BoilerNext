import bcrypt from "bcrypt";
import mongoose, { model, Model, Schema } from "mongoose";
import { ICountry } from "./../../../types";
import { IUser } from "../../../types";
const SALT_WORK_FACTOR = 10;

const CountrySchema: Schema = new Schema<ICountry>({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

const UserSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: CountrySchema,
  city: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  tel: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (
  candidatePassword: any,
  cb: any
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export const User: Model<IUser> =
  mongoose.models.User || model("User", UserSchema);

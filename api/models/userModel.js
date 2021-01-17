import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// compare entered and hashed passwords
userSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

// encrypt password pre save
userSchema.pre("save", async function (next) {
  // do not encrypt if password is not modified
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const passwordEncrypted = await bcrypt.hash(this.password, salt);
  this.password = passwordEncrypted;
});

const User = mongoose.model("User", userSchema);

export default User;

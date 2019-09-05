const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    age: Number,
    avatar: {
      type: String,
      default:
        "https://vignette.wikia.nocookie.net/ghostintheshell/images/f/fe/Laughing_man.svg/revision/latest/scale-to-width-down/300?cb=20100909044445&path-prefix=en"
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

userSchema.index({ email: 1 }, { unique: true }); // ensure unique email
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    token: {
      type: String,
      expire: "180d",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("RefreshToken", refreshTokenSchema);

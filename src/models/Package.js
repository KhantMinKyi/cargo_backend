const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    waybill_list: [
      {
        waybill_id: String,
        waybill_no: String,
      },
    ],
    status: {
      type: String,
      enum: ["package", "ctf"],
      required: true,
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;

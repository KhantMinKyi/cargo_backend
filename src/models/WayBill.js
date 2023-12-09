const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const waybillSchema = new Schema(
  {
    waybill_no: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["collect", "package", "ctf"],
      required: true,
    },
  },
  { timestamps: true }
);

const WayBill = mongoose.model("WayBill", waybillSchema);
module.exports = WayBill;

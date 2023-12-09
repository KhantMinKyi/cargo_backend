const express = require("express");
const WayBill = require("../models/WayBill");

const index = (req, res) => {
  WayBill.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const store = (req, res) => {
  for (let i = 1; i <= 10; i++) {
    const newWayBill = new WayBill({
      waybill_no: `00${i}`,
      status: `collect`,
      // Add values for other fields as needed
    });

    newWayBill
      .save()
      .then((savedWayBill) => {
        console.log(`Blog ${i} saved:`, savedWayBill);
      })
      .catch((error) => {
        console.error(`Error saving Blog ${i}:`, error);
      });
  }
  res.redirect("/waybills");
};
const detail = (req, res) => {
  const id = req.params.id;
  WayBill.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  index,
  store,
  detail,
};

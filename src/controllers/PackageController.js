const express = require("express");
const Package = require("../models/Package");

const index = (req, res) => {
  if (req.query.waybill_id) {
    waybillId = req.query.waybill_id;
    Package.find({ "waybill_list.waybill_id": waybillId })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Package.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const store = (req, res) => {
  for (let i = 800001; i <= 900000; i++) {
    const newPackage = new Package({
      waybill_list: [
        {
          waybill_id: `hfg456dfg${i}`,
          waybill_no: `00${i}`,
        },
        {
          waybill_id: `hfg456dfg${i + 1}`,
          waybill_no: `00${i + 1}`,
        },
        {
          waybill_id: `hfg456dfg${i + 2}`,
          waybill_no: `00${i + 2}`,
        },
      ],
      status: `package`,
      // Add values for other fields as needed
    });

    newPackage
      .save()
      .then((result) => {
        console.log(`Blog ${i} saved:`, result);
      })
      .catch((error) => {
        console.error(`Error saving Blog ${i}:`, error);
      });
  }
  res.redirect("/packages");
};
const detail = (req, res) => {
  const id = req.params.id;
  Package.findById(id)
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

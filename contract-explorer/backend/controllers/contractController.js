const Contract = require("../models/Contract");
const Page = require("../models/Page");


// helper: convert filters object to mongo query
const buildFilterFromConfig = (filtersConfig = {}) => {
  const mongoFilter = {};

  Object.keys(filtersConfig).forEach((key) => {
    const value = filtersConfig[key];
    if (Array.isArray(value)) {
      mongoFilter[key] = { $in: value };
    } else {
      mongoFilter[key] = value;
    }
  });

  return mongoFilter;
};


// Create Contract
exports.createContract = async (req, res) => {
  try {
    const contract = await Contract.create(req.body);
    res.status(201).json(contract);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Get Contracts (with dynamic filters + pageId)
exports.getContracts = async (req, res) => {
  try {
    const { pageId, minAmount, maxAmount, ...userFilters } = req.query;

    let finalFilter = {};


    // 1) Page filters from DB
    if (pageId) {
      const page = await Page.findById(pageId);
      if (page && page.filters) {
        finalFilter = {
          ...finalFilter,
          ...buildFilterFromConfig(page.filters),
        };
      }
    }


    // 2) User filters (override / add)
    Object.keys(userFilters).forEach((key) => {
      // If comma separated (e.g. contractType=SOW,Master)
      if (String(userFilters[key]).includes(",")) {
        finalFilter[key] = { $in: userFilters[key].split(",") };
      } else {
        finalFilter[key] = userFilters[key];
      }
    });


    // 3) Amount range
    if (minAmount || maxAmount) {
      finalFilter.amount = {};
      if (minAmount) finalFilter.amount.$gte = Number(minAmount);
      if (maxAmount) finalFilter.amount.$lte = Number(maxAmount);
    }

    const contracts = await Contract.find(finalFilter);
    res.json(contracts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


// Get Contract by ID
exports.getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });
    res.json(contract);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update Contract
exports.updateContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });
    res.json(contract);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete Contract
exports.deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });
    res.json({ message: "Contract deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

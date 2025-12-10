const Page = require("../models/Page");

exports.createPage = async (req, res) => {
  try {
    const page = await Page.create(req.body);
    res.status(201).json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getPages = async (req, res) => {
  try {
    const { url } = req.query;

    let query = {};
    if (url) {
      query.url = url;
    }

    const pages = await Page.find(query).sort({ rank: 1 });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json({ message: "Page deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

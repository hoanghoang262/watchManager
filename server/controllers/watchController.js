import Watch from "../models/watch.js";
import Comment from "../models/comment.js";
import Brand from "../models/brand.js";

export const getAllWatches = async (req, res) => {
  const watches = await Watch.find().populate("brand", "brandName");
  res.json(watches);
};

export const getWatchById = async (req, res) => {
  const watch = await Watch.findById(req.params.watchId).populate(
    "brand",
    "brandName"
  );
  res.json(watch);
};

export const searchWatches = async (req, res) => {
  const { watchName } = req.query;
  const watches = await Watch.find({
    watchName: new RegExp(watchName, "i"),
  }).populate("brand", "brandName");
  res.json(watches);
};

export const filterWatchesByBrand = async (req, res) => {
  const { brandName } = req.query;
  const brand = await Brand.findOne({ brandName });
  if (brand) {
    const watches = await Watch.find({ brand: brand._id }).populate(
      "brand",
      "brandName"
    );
    res.json(watches);
  } else {
    res.json([]);
  }
};

export const createWatch = async (req, res) => {
  const { watchName, image, price, Automatic, watchDescription, brand } =
    req.body;
  const watch = new Watch({
    watchName,
    image,
    price,
    Automatic,
    watchDescription,
    brand,
  });
  await watch.save();
  console.log(watch);
  res.json(watch);
};

export const updateWatch = async (req, res) => {
  const { watchName, image, price, Automatic, watchDescription, brand } =
    req.body;
  const watch = await Watch.findByIdAndUpdate(
    req.params.watchId,
    { watchName, image, price, Automatic, watchDescription, brand },
    { new: true }
  );
  res.json(watch);
};

export const deleteWatch = async (req, res) => {
  await Watch.findByIdAndDelete(req.params.watchId);
  res.sendStatus(204);
};

export const addComment = async (req, res) => {
  const { rating, content } = req.body;
  const watch = await Watch.findById(req.params.watchId);
  if (!watch) return res.sendStatus(404);

  const comment = new Comment({ rating, content, author: req.user._id });
  await comment.save();
  watch.comments.push(comment._id);
  await watch.save();
  res.json(watch);
};

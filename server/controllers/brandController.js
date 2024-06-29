import Brand from "../models/brand.js";

export const getAllBrands = async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
};

export const createBrand = async (req, res) => {
  const { brandName } = req.body;
  const brand = new Brand({ brandName });
  await brand.save();
  res.json(brand);
};

export const getBrandById = async (req, res) => {
  const brand = await Brand.findById(req.params.brandId);
  res.json(brand);
};

export const updateBrand = async (req, res) => {
  const { brandName } = req.body;
  const brand = await Brand.findByIdAndUpdate(
    req.params.brandId,
    { brandName },
    { new: true }
  );
  res.json(brand);
};

export const deleteBrand = async (req, res) => {
  await Brand.findByIdAndDelete(req.params.brandId);
  res.sendStatus(204);
};

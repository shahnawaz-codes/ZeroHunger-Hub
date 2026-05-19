const asyncHandler = require("../../utils/asyncHandler");
const { createbag, getAllbags, getbagById, Mybags } = require("./bag.service");

//----------------- restaurant ----------------------
/**
 * @desc    Create a new bag
 * @route   POST /api/restaurant/bags
 * @access  Private (restaurant)
 * */
const createHandler = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    pricing,
    category,
    quantity,
    pickupWindow,
    expiryTime,
    tags,
  } = req.body;
  let payload = {
    name,
    description,
    pricing,
    category,
    quantity,
    pickupWindow,
    expiryTime,
    tags,
  };
  const bag = await createbag(payload, req.restaurant._id);
  res.status(201).json({ success: true, data: bag });
});

/**
 * @desc Get All Restaurant Added bags
 * @route GET /api/bags/my
 * @access Private (restaurant)
 * */
const MybagsHandler = asyncHandler(async (req, res) => {
  const bags = await Mybags(req?.restaurant._id);
  res.status(200).json({ success: true, data: bags });
});

//------------------------ user ---------------------------
/**
 * @desc    Get all bags
 * @route   GET /api/bags
 * @access  Public
 */
const allbagsHandler = asyncHandler(async (req, res) => {
  const { lng, lat, radius } = req.query;
  console.log(lng, lat, radius);
  const bags = await getAllbags(lng, lat, radius);
  res.json({ success: true, data: bags });
});

/**
 * @desc    Get bag by id
 * @route   GET /api/bags/:id
 * @access  Public
 */
const bagByIdHandler = asyncHandler(async (req, res) => {
  const bag = await getbagById(req.params.bagId);
  res.json({ success: true, data: bag });
});

module.exports = {
  createHandler,
  allbagsHandler,
  bagByIdHandler,
  MybagsHandler,
};

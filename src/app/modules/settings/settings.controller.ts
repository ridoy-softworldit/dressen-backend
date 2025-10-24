import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { settingsServices } from "./settings.service";

// ✅ Create Settings
const createSettings = catchAsync(async (req, res) => {
  const files =
    (req.files as { [fieldname: string]: Express.Multer.File[] }) || {};

  const logo = files["logo"] ? files["logo"][0].path : undefined;
  const sliderImages = files["sliderImages"]
    ? files["sliderImages"].map((f) => f.path)
    : [];
  const popupImage = files["popupImage"]
    ? files["popupImage"][0].path
    : undefined;

  const settingsData = {
    ...req.body,
    logo,
    sliderImages,
    popupImage,
  };

  const result = await settingsServices.createSettingsOnDB(settingsData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Settings created successfully!",
    data: result,
  });
});

// ✅ Get Settings
const getSettings = catchAsync(async (req, res) => {
  const result = await settingsServices.getSettingsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Settings retrieved successfully!",
    data: result,
  });
});

// ✅ Update Settings
const updateSettings = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const updatedData: any = { ...req.body };

  if (files?.logo?.length) {
    updatedData.logo = files.logo[0].path;
  }
  if (files?.sliderImages?.length) {
    updatedData.sliderImages = files.sliderImages.map((f) => f.path);
  }
  if (files?.popupImage?.length) {
    updatedData.popupImage = files.popupImage[0].path;
  }

  const result = await settingsServices.updateSettingsOnDB(updatedData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Settings updated successfully!",
    data: result,
  });
});

export const settingsControllers = {
  createSettings,
  getSettings,
  updateSettings,
};

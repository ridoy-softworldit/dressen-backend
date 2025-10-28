import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import AppError from "../../errors/handleAppError";
import { TSettings } from "./settings.interface";
import { SettingsModel } from "./settings.model";

// ✅ Create Settings
const createSettingsOnDB = async (payload: TSettings) => {
  const exist = await SettingsModel.findOne();
  if (exist)
    throw new AppError(400, "Settings already exist. Please update instead.");
  const result = await SettingsModel.create(payload);
  return result;
};

// ✅ Get All Settings (Only one record)
const getSettingsFromDB = async () => {
  const result = await SettingsModel.findOne();
  return result;
};

// ✅ Get Logo Only
const getLogoFromDB = async () => {
  const settings = await SettingsModel.findOne();
  if (!settings?.logo) throw new AppError(404, "Logo not found!");
  return { logo: settings.logo };
};

// ✅ Get Slider Images Only
const getSliderImagesFromDB = async () => {
  const settings = await SettingsModel.findOne();
  if (!settings?.sliderImages?.length)
    throw new AppError(404, "No slider images found!");
  return { sliderImages: settings.sliderImages };
};

// ✅ Get Contact and Social Info Only
const getContactAndSocialFromDB = async () => {
  const settings = await SettingsModel.findOne();
  if (!settings?.contactAndSocial)
    throw new AppError(404, "Contact and social info not found!");
  return { contactAndSocial: settings.contactAndSocial };
};

// ✅ Get Mobile MFS Info Only
const getMobileMfsFromDB = async () => {
  const settings = await SettingsModel.findOne();
  if (!settings?.mobileMfs)
    throw new AppError(404, "Mobile MFS info not found!");
  return { mobileMfs: settings.mobileMfs };
};

// ✅ Get Delivery Charge Only (if exists)
const getDeliveryChargeFromDB = async () => {
  const settings = await SettingsModel.findOne();
  if (!settings?.deliveryCharge && settings?.deliveryCharge !== 0)
    throw new AppError(404, "Delivery charge not found!");
  return { deliveryCharge: settings.deliveryCharge };
};

// ✅ Update Settings

const updateSettingsOnDB = async (updatedData: Partial<TSettings>) => {
  const settings = await SettingsModel.findOne();
  if (!settings) throw new AppError(404, "Settings not found!");

  // ✅ Handle slider image updates intelligently
  if (updatedData.sliderImages?.length) {
    // Append new images to the old ones (keep max 3)
    const oldImages = settings.sliderImages || [];
    const newImages = updatedData.sliderImages;

    // Remove duplicates and limit to 3
    const mergedImages = Array.from(
      new Set([...oldImages, ...newImages])
    ).slice(0, 3);

    updatedData.sliderImages = mergedImages;
  } else {
    // Keep existing ones if not provided
    updatedData.sliderImages = settings.sliderImages;
  }

  // ✅ Handle deletedSliderImages if any
  if ((updatedData as any).deletedSliderImages?.length > 0) {
    updatedData.sliderImages = settings.sliderImages?.filter(
      (img) => !(updatedData as any).deletedSliderImages.includes(img)
    );

    // Delete from Cloudinary
    await Promise.all(
      (updatedData as any).deletedSliderImages.map((img: string) =>
        deleteImageFromCLoudinary(img)
      )
    );
  }

  // ✅ Deep merge for mobileMfs
  if (updatedData.mobileMfs) {
    updatedData.mobileMfs = {
      bKash: {
        ...(settings.mobileMfs?.bKash || {}),
        ...(updatedData.mobileMfs.bKash || {}),
      },
      nagad: {
        ...(settings.mobileMfs?.nagad || {}),
        ...(updatedData.mobileMfs.nagad || {}),
      },
      rocket: {
        ...(settings.mobileMfs?.rocket || {}),
        ...(updatedData.mobileMfs.rocket || {}),
      },
      upay: {
        ...(settings.mobileMfs?.upay || {}),
        ...(updatedData.mobileMfs.upay || {}),
      },
    };
  }

  // ✅ Deep merge for contactAndSocial
  if (updatedData.contactAndSocial) {
    updatedData.contactAndSocial = {
      ...(settings.contactAndSocial || {}),
      ...(updatedData.contactAndSocial || {}),
    };
  }

  // ✅ Update document
  const result = await SettingsModel.findOneAndUpdate({}, updatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};
export const settingsServices = {
  createSettingsOnDB,
  getSettingsFromDB,
  getLogoFromDB,
  getSliderImagesFromDB,
  getContactAndSocialFromDB,
  getMobileMfsFromDB,
  getDeliveryChargeFromDB,
  updateSettingsOnDB,
};

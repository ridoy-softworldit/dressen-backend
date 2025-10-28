"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsServices = void 0;
const cloudinary_config_1 = require("../../config/cloudinary.config");
const handleAppError_1 = __importDefault(require("../../errors/handleAppError"));
const settings_model_1 = require("./settings.model");
// ✅ Create Settings
const createSettingsOnDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield settings_model_1.SettingsModel.findOne();
    if (exist)
        throw new handleAppError_1.default(400, "Settings already exist. Please update instead.");
    const result = yield settings_model_1.SettingsModel.create(payload);
    return result;
});
// ✅ Get All Settings (Only one record)
const getSettingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.SettingsModel.findOne();
    return result;
});
// ✅ Get Logo Only
const getLogoFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const settings = yield settings_model_1.SettingsModel.findOne();
    if (!(settings === null || settings === void 0 ? void 0 : settings.logo))
        throw new handleAppError_1.default(404, "Logo not found!");
    return { logo: settings.logo };
});
// ✅ Get Slider Images Only
const getSliderImagesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const settings = yield settings_model_1.SettingsModel.findOne();
    if (!((_a = settings === null || settings === void 0 ? void 0 : settings.sliderImages) === null || _a === void 0 ? void 0 : _a.length))
        throw new handleAppError_1.default(404, "No slider images found!");
    return { sliderImages: settings.sliderImages };
});
// ✅ Get Contact and Social Info Only
const getContactAndSocialFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const settings = yield settings_model_1.SettingsModel.findOne();
    if (!(settings === null || settings === void 0 ? void 0 : settings.contactAndSocial))
        throw new handleAppError_1.default(404, "Contact and social info not found!");
    return { contactAndSocial: settings.contactAndSocial };
});
// ✅ Get Mobile MFS Info Only
const getMobileMfsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const settings = yield settings_model_1.SettingsModel.findOne();
    if (!(settings === null || settings === void 0 ? void 0 : settings.mobileMfs))
        throw new handleAppError_1.default(404, "Mobile MFS info not found!");
    return { mobileMfs: settings.mobileMfs };
});
// ✅ Get Delivery Charge Only (if exists)
const getDeliveryChargeFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const settings = yield settings_model_1.SettingsModel.findOne();
    if (!(settings === null || settings === void 0 ? void 0 : settings.deliveryCharge) && (settings === null || settings === void 0 ? void 0 : settings.deliveryCharge) !== 0)
        throw new handleAppError_1.default(404, "Delivery charge not found!");
    return { deliveryCharge: settings.deliveryCharge };
});
// ✅ Update Settings
const updateSettingsOnDB = (updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const settings = yield settings_model_1.SettingsModel.findOne();
    if (!settings)
        throw new handleAppError_1.default(404, "Settings not found!");
    // ✅ Handle slider image updates intelligently
    if ((_a = updatedData.sliderImages) === null || _a === void 0 ? void 0 : _a.length) {
        // Append new images to the old ones (keep max 3)
        const oldImages = settings.sliderImages || [];
        const newImages = updatedData.sliderImages;
        // Remove duplicates and limit to 3
        const mergedImages = Array.from(new Set([...oldImages, ...newImages])).slice(0, 3);
        updatedData.sliderImages = mergedImages;
    }
    else {
        // Keep existing ones if not provided
        updatedData.sliderImages = settings.sliderImages;
    }
    // ✅ Handle deletedSliderImages if any
    if (((_b = updatedData.deletedSliderImages) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        updatedData.sliderImages = (_c = settings.sliderImages) === null || _c === void 0 ? void 0 : _c.filter((img) => !updatedData.deletedSliderImages.includes(img));
        // Delete from Cloudinary
        yield Promise.all(updatedData.deletedSliderImages.map((img) => (0, cloudinary_config_1.deleteImageFromCLoudinary)(img)));
    }
    // ✅ Deep merge for mobileMfs
    if (updatedData.mobileMfs) {
        updatedData.mobileMfs = {
            bKash: Object.assign(Object.assign({}, (((_d = settings.mobileMfs) === null || _d === void 0 ? void 0 : _d.bKash) || {})), (updatedData.mobileMfs.bKash || {})),
            nagad: Object.assign(Object.assign({}, (((_e = settings.mobileMfs) === null || _e === void 0 ? void 0 : _e.nagad) || {})), (updatedData.mobileMfs.nagad || {})),
            rocket: Object.assign(Object.assign({}, (((_f = settings.mobileMfs) === null || _f === void 0 ? void 0 : _f.rocket) || {})), (updatedData.mobileMfs.rocket || {})),
            upay: Object.assign(Object.assign({}, (((_g = settings.mobileMfs) === null || _g === void 0 ? void 0 : _g.upay) || {})), (updatedData.mobileMfs.upay || {})),
        };
    }
    // ✅ Deep merge for contactAndSocial
    if (updatedData.contactAndSocial) {
        updatedData.contactAndSocial = Object.assign(Object.assign({}, (settings.contactAndSocial || {})), (updatedData.contactAndSocial || {}));
    }
    // ✅ Update document
    const result = yield settings_model_1.SettingsModel.findOneAndUpdate({}, updatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.settingsServices = {
    createSettingsOnDB,
    getSettingsFromDB,
    getLogoFromDB,
    getSliderImagesFromDB,
    getContactAndSocialFromDB,
    getMobileMfsFromDB,
    getDeliveryChargeFromDB,
    updateSettingsOnDB,
};

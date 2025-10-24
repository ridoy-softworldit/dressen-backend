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
exports.settingsControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const settings_service_1 = require("./settings.service");
// ✅ Create Settings
const createSettings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files || {};
    const logo = files["logo"] ? files["logo"][0].path : undefined;
    const sliderImages = files["sliderImages"]
        ? files["sliderImages"].map((f) => f.path)
        : [];
    const popupImage = files["popupImage"]
        ? files["popupImage"][0].path
        : undefined;
    const settingsData = Object.assign(Object.assign({}, req.body), { logo,
        sliderImages,
        popupImage });
    const result = yield settings_service_1.settingsServices.createSettingsOnDB(settingsData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Settings created successfully!",
        data: result,
    });
}));
// ✅ Get Settings
const getSettings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_service_1.settingsServices.getSettingsFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Settings retrieved successfully!",
        data: result,
    });
}));
// ✅ Update Settings
const updateSettings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const files = req.files;
    const updatedData = Object.assign({}, req.body);
    if ((_a = files === null || files === void 0 ? void 0 : files.logo) === null || _a === void 0 ? void 0 : _a.length) {
        updatedData.logo = files.logo[0].path;
    }
    if ((_b = files === null || files === void 0 ? void 0 : files.sliderImages) === null || _b === void 0 ? void 0 : _b.length) {
        updatedData.sliderImages = files.sliderImages.map((f) => f.path);
    }
    if ((_c = files === null || files === void 0 ? void 0 : files.popupImage) === null || _c === void 0 ? void 0 : _c.length) {
        updatedData.popupImage = files.popupImage[0].path;
    }
    const result = yield settings_service_1.settingsServices.updateSettingsOnDB(updatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Settings updated successfully!",
        data: result,
    });
}));
exports.settingsControllers = {
    createSettings,
    getSettings,
    updateSettings,
};

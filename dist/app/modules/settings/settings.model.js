"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModel = void 0;
const mongoose_1 = require("mongoose");
const settingsSchema = new mongoose_1.Schema({
    enableHomepagePopup: { type: Boolean, default: false },
    popupTitle: { type: String },
    popupDescription: { type: String },
    popupDelay: { type: Number, default: 2000 },
    popupImage: { type: String },
    logo: { type: String },
    sliderImages: {
        type: [String],
        validate: [
            (val) => val.length <= 3,
            "Maximum 3 slider images allowed",
        ],
    },
    privacyPolicy: {
        title: { type: String },
        description: { type: String },
    },
    returnPolicy: {
        title: { type: String },
        description: { type: String },
    },
    contactAndSocial: {
        address: { type: String },
        email: { type: String },
        phone: { type: String },
        facebookUrl: { type: [String] },
        instagramUrl: { type: [String] },
        youtubeUrl: { type: [String] },
        whatsappLink: { type: [String] },
    },
}, { timestamps: true });
exports.SettingsModel = (0, mongoose_1.model)("Settings", settingsSchema);

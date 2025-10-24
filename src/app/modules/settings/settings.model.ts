import { Schema, model } from "mongoose";
import { TSettings } from "./settings.interface";

const settingsSchema = new Schema<TSettings>(
  {
    enableHomepagePopup: { type: Boolean, default: false },
    popupTitle: { type: String },
    popupDescription: { type: String },
    popupDelay: { type: Number, default: 2000 },
    popupImage: { type: String },

    logo: { type: String },
    sliderImages: {
      type: [String],
      validate: [
        (val: string[]) => val.length <= 3,
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
  },
  { timestamps: true }
);

export const SettingsModel = model<TSettings>("Settings", settingsSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSettingsValidationSchema = void 0;
const zod_1 = require("zod");
exports.createSettingsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        enableHomepagePopup: zod_1.z.boolean().optional(),
        popupTitle: zod_1.z.string().optional(),
        popupDescription: zod_1.z.string().optional(),
        popupDelay: zod_1.z.number().optional(),
        privacyPolicy: zod_1.z
            .object({
            title: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
        })
            .optional(),
        returnPolicy: zod_1.z
            .object({
            title: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
        })
            .optional(),
        contactAndSocial: zod_1.z
            .object({
            address: zod_1.z.string().optional(),
            email: zod_1.z.string().optional(),
            phone: zod_1.z.string().optional(),
            facebookUrl: zod_1.z.string().optional(),
            instagramUrl: zod_1.z.string().optional(),
            whatsappLink: zod_1.z.string().optional(),
        })
            .optional(),
    }),
});

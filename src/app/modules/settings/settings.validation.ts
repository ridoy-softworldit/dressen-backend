import { z } from "zod";

export const createSettingsValidationSchema = z.object({
  body: z.object({
    enableHomepagePopup: z.boolean().optional(),
    popupTitle: z.string().optional(),
    popupDescription: z.string().optional(),
    popupDelay: z.number().optional(),
    privacyPolicy: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    returnPolicy: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    contactAndSocial: z
      .object({
        address: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        facebookUrl: z.string().optional(),
        instagramUrl: z.string().optional(),
        whatsappLink: z.string().optional(),
      })
      .optional(),
  }),
});

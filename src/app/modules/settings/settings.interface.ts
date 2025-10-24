export type TSettings = {
  enableHomepagePopup: boolean;
  popupTitle?: string;
  popupDescription?: string;
  popupDelay?: number;
  popupImage?: string;

  logo?: string;
  sliderImages?: string[]; // max 3

  privacyPolicy?: {
    title: string;
    description: string;
  };
  returnPolicy?: {
    title: string;
    description: string;
  };

  contactAndSocial?: {
    address?: string;
    email?: string;
    phone?: string;
    facebookUrl?: string[];
    instagramUrl?: string[];
    youtubeUrl?: string[];
    whatsappLink?: string[];
  };
};

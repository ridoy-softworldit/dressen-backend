import express from "express";
import { multerUpload } from "../../config/multer.config";
import { settingsControllers } from "./settings.controller";

const router = express.Router();

// Upload fields
const uploadFields = multerUpload.fields([
  { name: "logo", maxCount: 1 },
  { name: "popupImage", maxCount: 1 },
  { name: "sliderImages", maxCount: 3 },
]);

router.get("/", settingsControllers.getSettings);
router.post("/", uploadFields, settingsControllers.createSettings);
router.patch("/", uploadFields, settingsControllers.updateSettings);

export const settingsRoutes = router;

import { compressImage } from "../utils/compressImage";
import api from "./Api";

export const updateProfile = (data) => {
  return api.put("/profile/update", data);
};

export const updateAvatar = async (file) => {
  const compressedFile = await compressImage(file);
  const formData = new FormData();
  formData.append("photo", compressedFile);
  formData.append("_method", "PUT"); // spoof method

  return api.post("/profile/photo/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

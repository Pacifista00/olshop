import api from "./Api";

export const updateProfile = (data) => {
  return api.put("/profile/update", data);
};

export const updateAvatar = (formData) => {
  formData.append("_method", "PUT"); // spoof method

  return api.post("/profile/photo/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

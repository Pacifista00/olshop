import api from "./Api";

export const checkout = async (payload) => {
  const response = await api.post("/checkout", payload);
  return response.data;
};

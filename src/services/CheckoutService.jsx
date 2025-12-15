import api from "./Api";

export const checkout = async (shippingAddressId) => {
  const response = await api.post("/checkout", {
    shipping_address_id: shippingAddressId,
  });

  return response.data; // { snapToken }
};

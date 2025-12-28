import api from "./Api";

export const checkout = async (shippingAddressId, voucherCode) => {
  const response = await api.post("/checkout", {
    shipping_address_id: shippingAddressId,
    voucher_code: voucherCode,
  });

  return response.data; // { snapToken }
};

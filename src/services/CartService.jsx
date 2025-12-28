import api from "./Api";

/**
 * Ambil cart user yang sedang login
 */
export const getCart = () => {
  return api.get("/cart");
};

/**
 * Update quantity item cart
 */
export const updateCartQty = (cartId, quantity) => {
  return api.put(`/cart/update/${cartId}`, { quantity });
};

/**
 * Hapus item dari cart
 */
export const removeCartItem = (cartId) => {
  return api.delete(`/cart/delete/${cartId}`);
};

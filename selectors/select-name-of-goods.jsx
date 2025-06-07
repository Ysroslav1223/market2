export const selectNameOfGoods = (basket) =>
  basket?.items?.map(item => item.productId?.name) || [];
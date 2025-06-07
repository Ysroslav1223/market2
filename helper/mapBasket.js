export default function (basket){
    return {
        userId:basket.userId,
        items: basket.items
      .filter(item => item.productId) // убрать "пустые" товары
      .map(item => ({
        productId: item.productId,
        count: item.count
      }))
    }
}
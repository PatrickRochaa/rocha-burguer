export default function checkRestaurantOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 22;
}

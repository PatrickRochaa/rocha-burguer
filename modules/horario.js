import checkRestaurantOpen from "./checkRestaurantOpen.js";
checkRestaurantOpen();

export default function initHorario() {
  const spanItem = document.getElementById("date-span");
  const footer = document.getElementById("footer");
  const isOpen = checkRestaurantOpen();

  if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    footer.classList.remove("bg-red-500");

    footer.classList.add("bg-green-600");
    spanItem.classList.add("bg-green-600");
  } else {
    spanItem.classList.remove("bg-green-600");
    footer.classList.remove("bg-green-600");

    footer.classList.add("bg-red-500");
    spanItem.classList.add("bg-red-500");
  }
}

export default function initModal() {
  const cartBtn = document.getElementById("cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  //abrindo Modal do carrinho
  cartBtn.addEventListener("click", function () {
    cartModal.style.display = "flex";
  });

  //fechar Modal do carrinho clicando foral do Modal
  cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  //fechar Modal do carrinho clicando fno botao fechar
  closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
  });
}

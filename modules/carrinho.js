import checkRestaurantOpen from "./checkRestaurantOpen.js";
checkRestaurantOpen();

export default function initCarrinho() {
  const menu = document.getElementById("menu");
  const cartTotal = document.getElementById("cart-total");
  const cartCounter = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout-btn");
  const addressInput = document.getElementById("address");
  const addressWarn = document.getElementById("address-warn");
  const cartItemsContainer = document.getElementById("cart-items");
  let cart = [];

  menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");
    if (parentButton) {
      const name = parentButton.getAttribute("data-name");
      const price = parseFloat(parentButton.getAttribute("data-price"));
      addToCart(name, price);
      //console.log(cart);
    }
  });

  //funcao para adicionar no carrinho
  function addToCart(name, price) {
    const temItem = cart.find((item) => item.name === name);

    if (temItem) {
      // se ja tem produto vai aumentar a quantidade
      temItem.quantity += 1;
    } else {
      cart.push({
        name,
        price,
        quantity: 1,
      });
    }
    updateCartModal();
  }

  //Atualizar Carrinho
  function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add(
        "flex",
        "justify-between",
        "mb-4",
        "flex-col"
      );

      cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">${item.name}</p>
            <p>Quantidade: ${item.quantity}</p>
            <p class="font-medium mt-2">R$: ${item.price.toFixed(2)}</p>
          </div>

          <button class="remove-from-cart-btn bg-red-500 text-white rounded mt-2 mb-2 py-1 px-2" data-name="${
            item.name
          }">
             Remover
          </button>
         </div>
      `;

      //calcular total
      total += item.price * item.quantity;

      cartItemsContainer.appendChild(cartItemElement);
    });
    cartTotal.textContent = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    // ataulizando contador do carrinho
    cartCounter.innerHTML = cart.length;
  } // fim da updateCartModal

  // funcao de remover
  cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
      const name = event.target.getAttribute("data-name");

      removeItemCart(name);
    }
  });

  function removeItemCart(name) {
    const index = cart.findIndex((item) => item.name === name);

    if (index !== -1) {
      const item = cart[index];

      if (item.quantity > 1) {
        item.quantity -= 1;
        updateCartModal();
        return;
      }

      cart.splice(index, 1);
      updateCartModal();
    }
  } // funcao de remover

  //pegando endereço
  addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;

    if (inputValue !== "") {
      //addressWarn.classList.add("hidden");
      addressInput.classList.remove("border-red-500");
    }
  });

  const isOpen = checkRestaurantOpen();

  //inicio finalizar pedido do carrinho
  checkoutBtn.addEventListener("click", function () {
    if (!isOpen) {
      Toastify({
        text: "OPS! O restaurante está fechado!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#252525",
          color: "#ef4444",
        },
      }).showToast();
      // console.log("fechado");
      return;
    }

    if (addressInput.value === "") {
      //addressWarn.classList.remove("hidden");
      addressInput.classList.add("border-red-500");

      Toastify({
        text: "OPS! INFORME SEU ENDEREÇO!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#252525",
          color: "#ef4444",
        },
      }).showToast();
      // console.log("informe endereço");
      return;
    }

    if (cart.length === 0) return;

    //enviando para o whatsApp
    const cartItems = cart
      .map((item) => {
        return `${item.quantity} - ${item.name} R$: ${item.price} | `;
      })
      .join("");
    const message = encodeURIComponent(cartItems);
    const phone = "31985385297";
    window.open(
      `https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`,
      "_blank"
    ); //Fim do enviando para o whatsApp

    //limpar carrinho
    cart.length = 0;
    updateCartModal();
  }); //fim finalizar pedido do carrinho
} // fim funcao init

const socket = io();

const button = document.getElementById("button");
const prodTitle = document.getElementById("prodTitle");
const prodPrice = document.getElementById("prodPrice");
const prodThumb = document.getElementById("prodThumb");

button.addEventListener("click", () => {
  const producto = {
    product: prodTitle.value,
    price: prodPrice.value,
    thumbnail: prodThumb.value,
  };
  socket.emit("newProduct", producto);
});

const divProducts = document.getElementById("productos");

socket.on("productos", (datos) => {
  console.log("funciona");
  console.log(prods);
  if (datos.legth > 0) {
    divProducts.innerHTML = `
                                <div class="tableContainer">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Image</th>
                                        </tr>
                                        </thead>
                                        <tbody id="tbody>
                                        </tbody>
                                    </table>
                                </div>`;
    tableBody = document.getElementById("tbody");
    datos.forEach((producto) => {
      tableBody.innerHTML = `<tr>
                                        <td> ${producto.title} </td>
                                        <td> ${producto.price} </td>
                                        <td>
                                            <img src="${producto.thumbnail}" alt="${producto.title}" class="imgProd"> <!--El src lo va a ir a buscar a public porque alli declare que estan mis archivos estaticos-->
                                        </td>
                                    </tr>`;
    });
  }
  if (productos.length < 1) {
    divProducts.innerHTML = `<p>There are no products</p>`;
  }
});

const button2 = document.getElementById("button2");
const email = document.getElementById("email");
const message = document.getElementById("message");

button2.addEventListener("click", () => {
  const d = new Date();
  const day = d.getDay();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const second = d.getMilliseconds();
  const date = `${day}/${month}/${year} ${hour}:${minutes}:${second}`;
  const personMessage = {
    email: email.value,
    fecha: date,
    message: message.value,
  };
  socket.emit("newMessage", personMessage);
  button2.value = "";
  email.value = "";
  message.value = "";
});

const messagesContainer = document.getElementById("messagesContainer");

socket.on("messages", (mensajes) => {
  console.log(mensajes);
  messagesContainer.classList.add("mensajesContainerStyles");
  if (mensajes.length > 0) {
    const div = document.createElement("div");
    mensajes.forEach((mensaje) => {
      div.innerHTML = `<p><span class="mail">${mensaje.email} </span>
                                            <span class="fecha">[${mensaje.fecha}]: </span>
                                            <span class="msj">${mensaje.message}</span></p>`;
      messagesContainer.appendChild(div);
    });
  } else {
    messagesContainer.innerHTML = "";
    messagesContainer.classList.remove("mensajesContainerStyles");
  }
});

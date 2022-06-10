const socket = io();

const messagesDiv = document.getElementById("messages");
const btnEnviar = document.getElementById("enviar");
const inputNombre = document.getElementById("nombre");
const inputTexto = document.getElementById("texto");
const usuarioNuevo = `usuario-${Math.floor(Math.random() * 100)}`;

const mensajes = [];
socket.emit("set-name", usuarioNuevo);
socket.on("usuario-connected", (name) => {
  console.log("usuario-connected", name);
});

btnEnviar.addEventListener("click", () => {
  const texto = inputTexto.value;

  inputTexto.value = "";
  socket.emit("new-message", {
    usuario: usuarioNuevo,
    texto: texto,
    date: getNow(),
  });
  console.log(texto);

  socket.on("messages", (messages) => {
    console.log("mensaje recibido");
    console.log(messages);
    messagesDiv.innerHTML = messages
      .map((message) => {
        if (message.user === currentUser) {
          return `<div class="notification is-danger is-light"
             style="text-align: justify; margin-left: 35px;     padding: 15px;
             border-radius: 20px;">
                 <div>
                 <p>${messages.texto}</p>
                 </div>
                 <div
                     style="text-align: end; font-style: italic; font-weight: 400"
                     class="has-text-dark">
                 ${messages.usuario} - ${messages.date}
                 </div>
         </div>`;
        } else {
          return `<div
     class="notification is-primary is-light"
     style=" text-align: justify; margin-rigth:35px;     padding: 15px;
     border-radius: 20px;">
         <div>
         <p>${messages.texto}</p>
         </div>
         <div
         style="text-align: end; font-style: italic; font-weight: 400"
         class="has-text-dark"
         >
         ${messages.usuario} - ${messages.date}
         </div>
     </div>`;
        }
      })
      .join("");
  });
});
getNow = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

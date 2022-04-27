const Contenedor = require(`./contenedor`);

const ejecutar = async function () {
  let contenedorNuevo = new Contenedor("/Desafio2/productos.txt");
  const resultado = contenedorNuevo.save({
    title: "Alfombra",
    price: 150,
    thumbail:
      "https://imagenes.elpais.com/resizer/O4czKQgA1j36IqCt4aTOitqJA3s=/414x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/QYETAJYKBBAKLCL4YHUZSXVR5M.png",
  });

  contenedorNuevo.save({
    title: "Silla",
    price: 100,
    thumbail:
      "https://http2.mlstatic.com/D_NQ_NP_931157-MLA31308028051_072019-O.jpg",
  });

  contenedorNuevo.save({
    title: "Monopatin",
    price: 1200,
    thumbail:
      "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/245/791/products/718e032a-238d-42be-9830-d470019ae09a-78dd77bf4cb874088c16232991142539-640-0.jpg",
  });

  contenedorNuevo.save({
    title: "Celular",
    price: 1800,
    thumbail:
      "https://images.fravega.com/f300/13890bd15f4f552457d38251e9ac7fab.jpg.webp",
  });

  console.log(contenedorNuevo.getById());
};
ejecutar();

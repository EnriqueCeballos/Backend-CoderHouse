const { Router } = require(`express`);
const router = Router();
const Container = require("../../containerProductsApi");
const CarritosApiClass = require("../../carritoApiClass");

const productoApi = new Container("/data/productos.json");
const carritoApi = new CarritosApiClass("/data/carritos.json");

const admin = true;

function permissionAdminAndClient(req, res, next) {
  if (!admin) {
    res.send("You do not have access to this page");
  } else {
    next();
  }
}

router.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const producto = await carritoApi.getById(id);
  res.json(producto);
});

router.post("/", permissionAdminAndClient, async (req, res) => {
  const producto = await carritoApi.write();
  res.json(producto);
});

router.post(
  "/:id/productos/:idProducto",
  permissionAdminAndClient,
  async (req, res) => {
    const { id } = req.params;
    const { idProducto } = req.params;
    const producto = await productoApi.getById(idProducto);
    const newProduct = await carritoApi.createCarritoProds(id, producto);
    res.json(newProduct);
  }
);

router.delete("/:id", permissionAdminAndClient, async (req, res) => {
  const { id } = req.params;
  const carritos = await carritoApi.deleteC(id);
  res.json(carritos);
});

router.delete(
  "/:id/productos/:idProducto",
  permissionAdminAndClient,
  async (req, res) => {
    const { id } = req.params;
    const { idProducto } = req.params;
    const newProduct = await carritoApi.deleteP(id, idProducto);
    res.json(newProduct);
  }
);

module.exports = router;

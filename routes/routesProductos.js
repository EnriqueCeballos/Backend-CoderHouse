const { Router } = require(`express`);
const router = Router();
const Container = require("../containerProductsApi");
const containerProducts = new Container("/data/productos.json");

function permissionAdminAndClient(req, res, next) {
  if (!admin) {
    res.send("You do not have access to this page");
  } else {
    next();
  }
}

router.get("/", async (req, res) => {
  const productos = await containerProducts.getAll();
  res.render(`index.ejs`, { productos });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await containerProducts.getById(id);
  res.json({ producto });
});

router.post("/", permissionAdminAndClient, async (req, res) => {
  const body = req.body;
  const producto = await containerProducts.write(body);
  res.json(producto);
});

router.put("/api/productos/:id", permissionAdminAndClient, async (req, res) => {
  const obj = req.body;
  const producto = await containerProducts.update(obj);
  res.json(producto);
});

router.delete(
  "/api/productos/:id",
  permissionAdminAndClient,
  async (req, res) => {
    const { id } = Number(req.params);
    const producto = await containerProducts.deleteById(id);
    res.json(producto);
  }
);

module.exports = router;

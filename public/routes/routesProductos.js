const { Router } = require(`express`);
const router = Router();
const { db } = "./database/configDB";

const contenedorProd = require("../../containerProductsApi");
// const content = new contenedorProd(db.mariaDB, "productos");
// const content = new contenedorProd(db.mariaDB, "productos");

const admin = true;
function permissionAdminAndClient(req, res, next) {
  if (!admin) {
    res.send("You do not have access to this page");
  } else {
    next();
  }
}

router.get("/", async (req, res) => {
  const productos = await content.getAll();
  res.render("index", { productos });
});

router.get("/api/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await content.getById(id);
  res.json({ producto });
});

router.post("/", permissionAdminAndClient, async (req, res) => {
  const body = req.body;
  const producto = content.write(body);
  res.json(producto);
});

router.put("/api/productos/:id", permissionAdminAndClient, async (req, res) => {
  const obj = req.body;
  const producto = content.update(obj);
  res.json(producto);
});

router.delete(
  "/api/productos/:id",
  permissionAdminAndClient,
  async (req, res) => {
    const { id } = Number(req.params);
    const producto = await content.deleteById(id);
    res.json(producto);
  }
);

module.exports = router;

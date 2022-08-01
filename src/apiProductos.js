import { faker } from "@faker-js/faker/locale/es_MX";
import Data from "./data/apiClass.js";

class Products extends Data {
  constructor() {
    super();
  }
  async getProduct() {
    let listProducts = [];
    for (let i = 0; i < 5; i++) {
      const product = {
        title: faker.ecommerce.product(),
        price: faker.random.numeric(5),
        thumbnail: faker.image.technics(60, 50, true),
      };
      listProducts.push(product);
    }
    return listProducts;
  }
}
export default Products;

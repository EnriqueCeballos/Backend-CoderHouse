import mongoose from "mongoose";
import connectedDB from "../dataBases/configDB.js";

mongoose.connect(connectedDB.mongoDb);

class MongoClass {
  constructor(collectionName, docSchema) {
    this.collection = mongoose.model(collectionName, docSchema);
  }

  async getAll() {
    try {
      const all = await this.collection.find({});
      return all;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async findById(id) {
    try {
      const producto = await this.collection.findOne({ _id: id });
      return producto;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async create(obj) {
    try {
      const newProduct = await this.collection.create(obj);
      return newProduct;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async updateP(id, product) {
    try {
      const deleteProduct = await this.collection.deleteOne({ _id: id });
      const newProduct = await this.collection.create(product);
      return newProduct;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const deleteProduct = await this.collection.deleteOne({ _id: id });
      return deleteProduct;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }
}

export default MongoClass;

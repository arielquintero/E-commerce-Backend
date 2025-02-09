import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productsCollection = 'Products';


const productSchema = new mongoose.Schema(
  {
      title:
      {
        type: String,
        required: [true, 'The title is required'],
        max: 100
      },
      description:
      {
        type: String,
        required: [true, 'The description is obligatory'],
        max: 500
      },
      code:
      {
        type: String,
        required: true,
        max: 14,
        unique: true
      },
      price:
      {
        type: Number,
        required: [true, 'The price is obligatory']
      },
      stock:
      {
        type: Number,
        required: true
      },
      status:
      {
        type: Boolean,
        required: true
      },
      category:
      {
        type: String,
        required: true,
        unique: true
      },
      thumbnails:
      {
        type: Array, default: []
      }
  }
);

// Hook para validar al guardar (create o save)
productSchema.pre("save", async function (next) {
  if (this.isModified("code") || this.isModified("title") || this.isModified("category")) {
    // Normaliza el código (convierte a minúsculas y elimina espacios)
    this.code = this.code.toLowerCase().trim();
    this.title = this.title.trim();
    this.category = this.category.trim();

    // Validar que el código no esté repetido en toda la colección
    const existingProductByCode = await this.constructor.findOne({
      code: this.code,
    });

    if (
      existingProductByCode &&
      existingProductByCode._id.toString() !== this._id.toString()
    ) {
      throw new Error(
        `El código "${this.code}" ya está en uso en la categoría "${existingProductByCode.category}".`
      );
    }

    // Validar que no haya otro producto con el mismo título en la misma categoría
    const existingProductByTitle = await this.constructor.findOne({
      title: this.title,
      category: this.category,
    });

    if (
      existingProductByTitle &&
      existingProductByTitle._id.toString() !== this._id.toString()
    ) {
      throw new Error(
        `El título "${this.title}" ya está en uso en la categoría "${this.category}".`
      );
    }
  }

  next();
});

// Hook para validar al actualizar (findByIdAndUpdate o updateOne)
productSchema.pre("findByIdAndUpdate", async function (next) {
  const update = this.getUpdate(); // Obtiene los campos que se están actualizando
  console.log(update)
  const { code, title, category } = update;

  if (code || title || category) {
    const query = this.getQuery(); // Obtiene el filtro de la consulta (por ejemplo, { _id: ... })

    // Normaliza los campos si están presentes en la actualización
    if (code) update.code = code.toLowerCase().trim();
    if (title) update.title = title.trim();
    if (category) update.category = category.trim();

    // Validar que el código no esté repetido en toda la colección
    if (code) {
      const existingProductByCode = await this.model.findOne({
        code: update.code,
        _id: { $ne: query._id }, // Excluye el documento actual
      });

      if (existingProductByCode) {
        throw new Error(
          `El código "${update.code}" ya está en uso en la categoría "${existingProductByCode.category}".`
        );
      }
    }

    // Validar que no haya otro producto con el mismo título en la misma categoría
    if (title && category) {
      const existingProductByTitle = await this.model.findOne({
        title: update.title,
        category: update.category,
        _id: { $ne: query._id }, // Excluye el documento actual
      });

      if (existingProductByTitle) {
        throw new Error(
          `El título "${update.title}" ya está en uso en la categoría "${update.category}".`
        );
      }
    }
  }

  next();
});


productSchema.plugin(mongoosePaginate);

export const Product = mongoose.model(productsCollection, productSchema);







/*
import { v4 as uuid } from 'uuid';

export class ProductModels {
  constructor({ title, description, code, price, status = true, stock, category, thumbnails = [] }) {
    this.id = uuid();
    this.title = String(title);
    this.description = String(description);
    this.code = String(code);
    this.price = Number(price);
    this.status = Boolean(status);
    this.stock = Number(stock);
    this.category = String(category);
    this.thumbnails = Array.isArray(thumbnails) ? thumbnails.map(String) : [];
  }

  static getRequiredField() {
    return ["title", "description", "code", "price", "status", "stock", "category"];
  }
}
*/


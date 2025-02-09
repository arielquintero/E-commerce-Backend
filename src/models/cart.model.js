import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartCollections = "Carts"

const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: 
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true, // Campo requerido
          },
          quantity: 
          {
            type: Number,
            required: true,
            default: 1, // Valor por defecto
          },
          
        }
      ],
      default: [] // Valor por defecto
    }
});

cartSchema.plugin(mongoosePaginate);

cartSchema.pre("findOne", function (next) {
  this.populate("products.product");
  next();
});

export const Cart = mongoose.model(cartCollections, cartSchema);

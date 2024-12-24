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



"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/entities/product.entity.ts
var product_entity_exports = {};
__export(product_entity_exports, {
  Product: () => Product
});
module.exports = __toCommonJS(product_entity_exports);
var import_typeorm2 = require("typeorm");

// src/entities/category.entity.ts
var import_typeorm = require("typeorm");
var Category = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("increment", {
    name: "id"
  })
], Category.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "name",
    type: "varchar"
  })
], Category.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "created_at",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Category.prototype, "createdAt", 2);
Category = __decorateClass([
  (0, import_typeorm.Entity)({
    name: "category"
  })
], Category);

// src/entities/product.entity.ts
var Product = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], Product.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "name",
    type: "varchar"
  })
], Product.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "description",
    type: "text"
  })
], Product.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "image_url",
    type: "varchar"
  })
], Product.prototype, "image_url", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "price",
    type: "double precision"
  })
], Product.prototype, "price", 2);
__decorateClass([
  (0, import_typeorm2.ManyToMany)(() => Category, {
    cascade: true
  }),
  (0, import_typeorm2.JoinTable)({
    name: "product_category",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "category_id",
      referencedColumnName: "id"
    }
  })
], Product.prototype, "categories", 2);
Product = __decorateClass([
  (0, import_typeorm2.Entity)({
    name: "product"
  })
], Product);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Product
});

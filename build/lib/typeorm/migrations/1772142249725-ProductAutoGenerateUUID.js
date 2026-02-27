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

// src/lib/typeorm/migrations/1772142249725-ProductAutoGenerateUUID.ts
var ProductAutoGenerateUUID_exports = {};
__export(ProductAutoGenerateUUID_exports, {
  ProductAutoGenerateUUID1772142249725: () => ProductAutoGenerateUUID1772142249725
});
module.exports = __toCommonJS(ProductAutoGenerateUUID_exports);
var ProductAutoGenerateUUID1772142249725 = class {
  async up(queryRunner) {
    await queryRunner.query(
      `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      `
    );
    await queryRunner.query(
      `
      ALTER TABLE product
      ALTER COLUMN id SET DEFAULT uuid_generate_v4();
      `
    );
  }
  async down(queryRunner) {
    await queryRunner.query(
      `
      ALTER TABLE product
      ALTER COLUMN id DROP DEFAULT;
      `
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductAutoGenerateUUID1772142249725
});

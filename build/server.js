"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/app.ts
var import_reflect_metadata = require("reflect-metadata");

// src/lib/typeorm/typeorm.ts
var import_typeorm3 = require("typeorm");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  PORT: import_zod.z.coerce.number().default(3e3),
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/entities/product.entity.ts
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

// src/lib/typeorm/migrations/1772142249725-ProductAutoGenerateUUID.ts
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

// src/lib/typeorm/typeorm.ts
var appDataSource = new import_typeorm3.DataSource({
  type: "postgres",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [Product, Category],
  migrations: [ProductAutoGenerateUUID1772142249725],
  logging: env.NODE_ENV === "development"
});
appDataSource.initialize().then(() => {
  console.log("Database with typeorm connected!");
}).catch((error) => {
  console.error("Error connecting to database with typeorm:", error);
});

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/lib/pg/db.ts
var import_pg = require("pg");
var CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT
};
var Database = class {
  constructor() {
    this.pool = new import_pg.Pool(CONFIG);
    this.connection();
  }
  async connection() {
    try {
      this.client = await this.pool.connect();
    } catch (error) {
      console.error(`Error connecting to database: ${error}`);
      throw new Error(`Error connecting to database: ${error}`);
    }
  }
  get clientInstance() {
    return this.client;
  }
};
var database = new Database();

// src/repositories/pg/person.repository.ts
var PersonRepository = class {
  async create({
    cpf,
    name,
    birth,
    email,
    user_id
  }) {
    const result = await database.clientInstance?.query(
      "INSERT INTO person (cpf, name, birth, email, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [cpf, name, birth, email, user_id]
    );
    return result?.rows[0];
  }
};

// src/useCases/create-person.ts
var CreatePersonUseCase = class {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }
  handler(person) {
    return this.personRepository.create(person);
  }
};

// src/useCases/factory/make-create-person-use-case.ts
function makeCreatePersonUseCase() {
  const personRepository = new PersonRepository();
  const createPersonUseCase = new CreatePersonUseCase(personRepository);
  return createPersonUseCase;
}

// src/http/controllers/person/create.ts
var import_zod2 = require("zod");
async function create(request, reply) {
  const registerBodySchema = import_zod2.z.object({
    cpf: import_zod2.z.string(),
    name: import_zod2.z.string(),
    birth: import_zod2.z.coerce.date(),
    email: import_zod2.z.string().email(),
    user_id: import_zod2.z.coerce.number()
  });
  const { cpf, name, birth, email, user_id } = registerBodySchema.parse(
    request.body
  );
  const createPersonUseCase = makeCreatePersonUseCase();
  const person = await createPersonUseCase.handler({
    cpf,
    name,
    birth,
    email,
    user_id
  });
  reply.status(201).send(person);
}

// src/http/controllers/person/routes.ts
async function personRoutes(app2) {
  app2.post("/person", create);
}

// src/repositories/pg/user.repository.ts
var UserRepository = class {
  async create({
    username,
    password
  }) {
    const result = await database.clientInstance?.query(
      `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password]
    );
    return result?.rows[0];
  }
  async findWithPerson(userId) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "user" 
      LEFT JOIN person ON "user".id = person.user_id 
      WHERE "user".id = $1`,
      [userId]
    );
    return result?.rows[0];
  }
};

// src/useCases/create-user.ts
var CreateUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async handler(user) {
    return this.userRepository.create(user);
  }
};

// src/useCases/factory/make-create-user-use-case.ts
function makeCreateUserUseCase() {
  const userRepository = new UserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  return createUserUseCase;
}

// src/http/controllers/user/create.ts
var import_zod3 = __toESM(require("zod"));
async function create2(request, reply) {
  const registerBodySchema = import_zod3.default.object({
    username: import_zod3.default.string(),
    password: import_zod3.default.string()
  });
  const { username, password } = registerBodySchema.parse(request.body);
  const createUserUseCase = makeCreateUserUseCase();
  const user = await createUserUseCase.handler({
    username,
    password
  });
  return reply.status(201).send(user);
}

// src/useCases/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found");
  }
};

// src/useCases/find-with-person.ts
var FindWithPersonUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async handler(userId) {
    const user = await this.userRepository.findWithPerson(userId);
    if (!user)
      throw new ResourceNotFoundError();
    return user;
  }
};

// src/useCases/factory/make-find-with-person.ts
function makeFindWithPersonUseCase() {
  const userRepository = new UserRepository();
  const findWithPersonUseCase = new FindWithPersonUseCase(userRepository);
  return findWithPersonUseCase;
}

// src/http/controllers/user/find-user.ts
var import_zod4 = require("zod");
async function findUser(request, reply) {
  const registerParamsSchema = import_zod4.z.object({
    id: import_zod4.z.coerce.number()
  });
  const { id } = registerParamsSchema.parse(request.params);
  const findWithPersonUseCase = makeFindWithPersonUseCase();
  const user = await findWithPersonUseCase.handler(id);
  return reply.status(200).send(user);
}

// src/http/controllers/user/routes.ts
async function userRoutes(app2) {
  app2.get("/user/:id", findUser);
  app2.post("/user", create2);
}

// src/utils/global-error-handler.ts
var import_process = require("process");
var import_zod5 = require("zod");
var errorHandlerMap = {
  ZodError: (error, _, reply) => {
    return reply.status(400).send({
      message: "Validation error",
      ...error instanceof import_zod5.ZodError && { errors: error.format() }
    });
  },
  ResourceNotFoundError: (error, __, reply) => {
    return reply.status(404).send({ message: error.message });
  }
};
var globalErrorHandler = (error, _, reply) => {
  if (import_process.env.NODE_ENV === "development") {
    console.error(error);
  }
  const handler = errorHandlerMap[error.name];
  if (handler) {
    return handler(error, _, reply);
  }
  return reply.status(500).send({ message: "Internal server error" });
};

// src/repositories/pg/address.repository.ts
var AddressRepository = class {
  async findAddressByPersonId(personId, page, limit) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT address.*, person.*
      FROM address
      JOIN person ON address.person_id = person.id
      WHERE person.id = $1
      LIMIT $2 OFFSET $3
    `;
    const result = await database.clientInstance?.query(
      query,
      [personId, limit, offset]
    );
    return result?.rows || [];
  }
  async create({
    street,
    city,
    state,
    zip_code,
    person_id
  }) {
    const result = await database.clientInstance?.query(
      `INSERT INTO "address" (street, city, state, zip_code, person_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [street, city, state, zip_code, person_id]
    );
    return result?.rows[0];
  }
};

// src/useCases/create-address.ts
var CreateAddressUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  async handler(address) {
    return this.addressRepository.create(address);
  }
};

// src/useCases/factory/make-create-address-use-case.ts
function makeCreateAddressUseCase() {
  const addressRepository = new AddressRepository();
  const createAddressUseCase = new CreateAddressUseCase(addressRepository);
  return createAddressUseCase;
}

// src/http/controllers/address/create.ts
var import_zod6 = require("zod");
async function create3(request, reply) {
  const registerBodySchema = import_zod6.z.object({
    street: import_zod6.z.string(),
    city: import_zod6.z.string(),
    state: import_zod6.z.string(),
    zip_code: import_zod6.z.string(),
    person_id: import_zod6.z.number()
  });
  const { street, city, state, zip_code, person_id } = registerBodySchema.parse(
    request.body
  );
  const createAddressUseCase = makeCreateAddressUseCase();
  const address = await createAddressUseCase.handler({
    street,
    city,
    state,
    zip_code,
    person_id
  });
  reply.status(201).send(address);
}

// src/useCases/find-address-by-person.ts
var FindAddressByPersonUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  async handler(personId, page, limit) {
    return this.addressRepository.findAddressByPersonId(personId, page, limit);
  }
};

// src/useCases/factory/make-find-address-by-person-use-case.ts
function makeFindAddressByPersonUseCase() {
  const addressRepository = new AddressRepository();
  const findAddressByPersonUseCase = new FindAddressByPersonUseCase(
    addressRepository
  );
  return findAddressByPersonUseCase;
}

// src/http/controllers/address/find-address.ts
var import_zod7 = __toESM(require("zod"));
async function findAddress(request, reply) {
  const registerParamsSchema = import_zod7.default.object({
    personId: import_zod7.default.coerce.number()
  });
  const registerQuerySchema = import_zod7.default.object({
    page: import_zod7.default.coerce.number(),
    limit: import_zod7.default.coerce.number()
  });
  const { personId } = registerParamsSchema.parse(request.params);
  const { page = 1, limit = 10 } = registerQuerySchema.parse(request.query);
  const findAddressByPersonIdUseCase = makeFindAddressByPersonUseCase();
  const address = await findAddressByPersonIdUseCase.handler(
    personId,
    page,
    limit
  );
  return reply.status(200).send(address);
}

// src/http/controllers/address/routes.ts
async function addressRoutes(app2) {
  app2.post("/address", create3);
  app2.get("/address/person/:personId", findAddress);
}

// src/repositories/typeorm/product.repository.ts
var ProductRepository = class {
  constructor() {
    this.repository = appDataSource.getRepository(Product);
  }
  async create(product) {
    return this.repository.save(product);
  }
};

// src/useCases/create-product.ts
var CreateProductUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async handler(product) {
    return this.productRepository.create(product);
  }
};

// src/useCases/factory/make-create-product-use-case.ts
function makeCreateProductUseCase() {
  const productRepository = new ProductRepository();
  const createProductUseCase = new CreateProductUseCase(productRepository);
  return createProductUseCase;
}

// src/http/controllers/product/create.ts
var import_zod8 = require("zod");
async function create4(request, reply) {
  const registerBodySchema = import_zod8.z.object({
    name: import_zod8.z.string(),
    description: import_zod8.z.string(),
    image_url: import_zod8.z.string(),
    price: import_zod8.z.coerce.number(),
    categories: import_zod8.z.array(import_zod8.z.object({ id: import_zod8.z.coerce.number().optional(), name: import_zod8.z.string() })).optional()
  });
  const { name, description, image_url, price, categories } = registerBodySchema.parse(request.body);
  const createProductUseCase = makeCreateProductUseCase();
  const product = await createProductUseCase.handler({
    name,
    description,
    image_url,
    price,
    categories
  });
  return reply.status(201).send(product);
}

// src/http/controllers/product/routes.ts
async function productRoutes(app2) {
  app2.post("/product", create4);
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(personRoutes);
app.register(userRoutes);
app.register(addressRoutes);
app.register(productRoutes);
app.setErrorHandler(globalErrorHandler);

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});

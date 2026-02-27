"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/user/routes.ts
var routes_exports = {};
__export(routes_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/lib/pg/db.ts
var import_pg = require("pg");

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

// src/lib/pg/db.ts
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
var import_zod2 = __toESM(require("zod"));
async function create(request, reply) {
  const registerBodySchema = import_zod2.default.object({
    username: import_zod2.default.string(),
    password: import_zod2.default.string()
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
var import_zod3 = require("zod");
async function findUser(request, reply) {
  const registerParamsSchema = import_zod3.z.object({
    id: import_zod3.z.coerce.number()
  });
  const { id } = registerParamsSchema.parse(request.params);
  const findWithPersonUseCase = makeFindWithPersonUseCase();
  const user = await findWithPersonUseCase.handler(id);
  return reply.status(200).send(user);
}

// src/http/controllers/user/routes.ts
async function userRoutes(app) {
  app.get("/user/:id", findUser);
  app.post("/user", create);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});

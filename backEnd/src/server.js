import express from "express";
import cors from "cors";
import { join } from "path";

import listEndpoints from "express-list-endpoints";
import postStirve from "./services/posts/posts.js";
import authorStrive from "./services/authors/authors.js";
import {
  genericErrHandl,
  notFoundErrHandl,
  forbiddenFoundErrHandl,
  badreqFoundErrHandl,
} from "./errorHandler.js";
// === Server ===
const server = express();
const port = 3003;
const publicFolderPath = join(process.cwd(), "public");
// === COnfiguration | Before endpoints! ===
server.use(express.static(publicFolderPath));
// body converter
server.use(cors());
server.use(express.json());
// ==== ROUTES / ENDPOINTS ====
server.use("/authors", authorStrive);
server.use("/blogPosts", postStirve);
// ERROR MIDDLEWARE
server.use(badreqFoundErrHandl);
server.use(forbiddenFoundErrHandl);
server.use(notFoundErrHandl);
server.use(genericErrHandl);
// Listen
server.listen(port, () => {});
console.table(listEndpoints(server));

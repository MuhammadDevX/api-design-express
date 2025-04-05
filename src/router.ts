import { Router } from "express";

import { body, oneOf, validationResult } from "express-validator";
import { handleInputMiddleWare } from "./modules/middleware.js";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product.js";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update.js";
const router = Router();

/**
 *
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct); // can name it whatever
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputMiddleWare,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputMiddleWare,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 *
 * Update
 */

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate); // can name it whatever
router.put(
  "/update/:id",
  body("title").optional(),
  body("productId").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("asset").optional(),
  body("version").optional(),
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().optional(),
  body("body").exists().optional(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {}); // can name it whatever
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  (req, res) => {}
);
router.post(
  "/updatepoint",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updateId").exists().isString(),
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

// router.use((err, req, res) => {
//   console.log("in the router handler");
// });

export default router;

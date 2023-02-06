import express from "express";
import { HttpStatusCode } from "~/utilities/constant";
import { boardRoutes } from "./board.route";
import { columnRoutes } from "./column.route";
import { cardRoutes } from "./card.route";
const router = express.Router();
// GET v1/status
router.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({ status: "OK!" })
);

router.use("/boards", boardRoutes);
router.use("/columns", columnRoutes);
router.use("/cards", cardRoutes);

export const apiV1 = router;

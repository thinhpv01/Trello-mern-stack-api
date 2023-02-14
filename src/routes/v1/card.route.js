import express from "express";
import { CardController } from "~/controllers/card.controller";
import { CardValidation } from "~/validations/card.validation";
const router = express.Router();

router
  .route("/")
  .get((req, res) => console.log("Get cards"))
  .post(CardValidation.createNew, CardController.createNew);

router.route("/:id").put(CardValidation.update, CardController.update);

export const cardRoutes = router;

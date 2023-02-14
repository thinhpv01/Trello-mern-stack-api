import { BoardService } from "../services/board.service";
import { ColumnService } from "../services/column.service";
import { HttpStatusCode } from "~/utilities/constant";

const createNew = async (req, res) => {
  try {
    const result = await BoardService.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BoardService.update(id, req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

const getFullBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BoardService.getFullBoard(id);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: error.message,
    });
  }
};

export const BoardController = { createNew, getFullBoard, update };

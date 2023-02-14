import { BoardModel } from "../models/board.model";
import { cloneDeep } from "lodash";
const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };
    if (updateData._id) delete updateData._id;
    if (updateData.columns) delete updateData.columns;
    const updatedBoard = await BoardModel.update(id, updateData);
    return updatedBoard;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getFullBoard = async (id) => {
  try {
    const board = await BoardModel.getFullBoard(id);
    if (!board || !board.columns) {
      throw new Error("Board not found");
    }

    const transformBoard = cloneDeep(board);
    //add card to each column
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    );
    transformBoard.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (c) => c.columnId.toString() === column._id.toString()
      );
    });
    delete transformBoard.cards;
    return transformBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard, update };

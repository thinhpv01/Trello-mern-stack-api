import { BoardModel } from "../models/board.model";
const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (id) => {
  try {
    const board = await BoardModel.getFullBoard(id);
    //add card to each column
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (c) => c.columnId.toString() === column._id.toString()
      );
    });
    delete board.cards;
    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard };

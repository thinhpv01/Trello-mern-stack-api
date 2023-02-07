import { BoardModel } from "../models/board.model";
import { ColumnModel } from "../models/column.model";
const createNew = async (data) => {
  try {
    // const newColumn = await ColumnModel.createNew(data);
    // console.log({ newColumn });
    // console.log(typeof newColumn.boardId);
    // console.log(typeof newColumn.boardId.toString());
    // const updatedBoard = await BoardModel.pushColumnOrder(
    //   newColumn.boardId.toString(),
    //   newColumn._id.toString()
    // );
    // console.log(updatedBoard);
    // return newColumn;
    // transaction mongodb
    const createdColumn = await ColumnModel.createNew(data);
    const getNewColumn = await ColumnModel.findOneById(
      createdColumn.insertedId.toString()
    );
    // sửa lỗi undifined khi dùng hàm sort bên FE
    getNewColumn.cards = [];
    // update columnOrder Array in board collection
    const updateBoard = await BoardModel.pushColumnOrder(
      getNewColumn.boardId.toString(),
      getNewColumn._id.toString()
    );
    console.log(updateBoard);
    return getNewColumn;
  } catch (error) {
    throw new Error(error);
  }
};
// const update = async (id, data) => {
//   try {
//     const updateDate = {
//       ...data,
//       updateAt: Date.now(),
//     };
//     const result = await ColumnModel.update(id, updateDate);
//     return result;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };
    if (updateData._id) delete updateData._id;
    const updatedColumn = await ColumnModel.update(id, updateData);
    if (updatedColumn._destroy) {
      CardModel.deleteMany(updatedColumn.cardOrder);
    }
    return updatedColumn;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const ColumnService = { createNew, update };

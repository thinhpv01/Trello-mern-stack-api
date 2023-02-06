import { ColumnModel } from "../models/column.model";
const createNew = async (data) => {
  try {
    const result = await ColumnModel.createNew(data);
    return result;
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

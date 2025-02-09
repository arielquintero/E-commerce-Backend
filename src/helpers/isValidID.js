import mongoose from "mongoose";


const isValidID = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
}


export { isValidID };
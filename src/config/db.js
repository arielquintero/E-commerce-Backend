import mongoose from 'mongoose';

// En el msg deje los datos estos

const password = ""
const dataBD = ""
const URL = ""

// MongoDB connection
const connectedMongoDB = async () => {
  try {
    await mongoose.connect(URL)
    console.log('Conected to DB');
  } catch (error) {
    console.log("Error connecting to MongoDB",error);
  }
};

export { connectedMongoDB };
//connectedMongoDB();
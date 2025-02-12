import mongoose from 'mongoose';

// En el msg deje los datos estos

const password = 'ecommerce1234';
const dataBD = 'ProyectBackend';
const URL = `mongodb+srv://ariel08:${password}@cluster1.wpusk.mongodb.net/${dataBD}?retryWrites=true&w=majority`

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
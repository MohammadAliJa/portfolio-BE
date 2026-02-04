const app = require('./app');
const { connectMongoDB } = require('./config/db-mongo');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGODB_URI);
    await connectMongoDB();

    app.on("error", (error) => {
      throw new Error('Error', error);

    })

    app.listen(PORT || 3000, () => {
      console.log(`Server is running on port 
                ${PORT || 3000}`);
    });
  }
  catch (error) {
    console.error("Error starting the server", error);
  }
}

startServer();

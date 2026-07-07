const app = require('./app');
const { db } = require('./config/db-firestore');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("Firestore initialized successfully");

    app.on("error", (error) => {
      throw new Error('Error', error);
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
  catch (error) {
    console.error("Error starting the server", error);
  }
}

startServer();

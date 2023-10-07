import app from "./app";
import connectDB from "./mongodb/connect";

const startServer = async () => {
  try {
    if (process.env.MONGODB_URL) {
      connectDB(process.env.MONGODB_URL);
      app.listen(process.env.PORT, () =>
        console.log(`server has started on port ${process.env.PORT}`)
      );
    } else {
      const dbEnvError = new Error();
      dbEnvError.message = "Could not find DB URL env variable";
      throw dbEnvError;
    }
  } catch (error) {
    throw error;
  }
};

startServer();

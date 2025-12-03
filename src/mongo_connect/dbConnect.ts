import mongoose from "mongoose";


export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB Connected");
        });

        connection.on("error", (err:any) => {
            console.log("MongoDB connection error:", err);
            process.exit(1); // Exit with error code
        });

    } catch (error) {
        console.log("Database connection error:", error);
    }
}

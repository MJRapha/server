import mongoose from "mongoose";

const connectDB = async (uri: string): Promise<void> => {
    try {
        await mongoose.connect(uri);
        const productSchema = new mongoose.Schema({});
        const product = mongoose.model('product', productSchema);
        const data = await product.find();
        console.warn(data);
        console.log("WORKS")
    } catch (error) {
        throw new Error(`Something went wrong: ${error}`)
    }
}

export default connectDB;

//start with cd server in terminal
//and then you know...

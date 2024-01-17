import connectDB from "./connectDb";
import config from '../config/config.json';


const initialDB = async (): Promise<void> => {
    try {
        let dbUri: string;

        // Detrmine the database URI based on the NODE_ENV enviroment variable
        switch (process.env.NODE_ENV) {
            case "development":
                dbUri = config.DB.uri;
                break;

            default:
                throw new Error('Invalid NODE_ENV')
        }

        await connectDB(dbUri);

    } catch (error) {
        console.error(error);
    }
}

export default initialDB
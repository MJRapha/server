import { Schema, model } from "mongoose";
interface ICard {
    nameOfMeme: string;
    description: string,
    image: string;
}
const cardSchema = new Schema({
    nameOfMeme: String,
    description: String,
    image: String,
})

const Card = model<ICard>("Card", cardSchema);

export default Card
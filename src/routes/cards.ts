import { Router } from "express";
import _ from "underscore";
import Card from "../models/Card";
import validateToken from "../middlewares/validateToken";
import { Tokens } from "../utils";

const router = Router();
router.get("/", async (req, res) => {
    try {
        const products = await Card.find({})
        return res.json(products);
    } catch (e) {
        return res.status(500).json({ message: "Server DB Error", error: e });
    }
})


router.post("/add", async (req, res) => {
    try {
        const body = _.pick(req.body, "nameOfMeme", "description", "image");
        //12 rounds takes more
        const product = new Card(body);
        await product.save();
        return res.json(product);
    } catch (e) {
        return res.status(500).json({ message: "Server DB Error", error: e });
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        //const user = (req as any).user as ReturnType<typeof Tokens.prototype.decodeToken>
        // TODO: make sure the user that is trying to delete the cars
        // is the user that created that card
        // currently any authenticated user is allowed to delete any card
        const id = req.params.id
        const product = await Card.findByIdAndDelete(id)
        return res.json(product);
    } catch (e) {
        return res.status(500).json({ message: "Server DB Error", error: e });
    }
})

export { router as cardRouter };
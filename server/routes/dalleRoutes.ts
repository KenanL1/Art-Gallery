import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { routeHandler } from "../utils/routeUils.js";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Call OpenAI Text-to-Image API to generate an image
router.route("/").post(async (req: express.Request, res: express.Response) => {
  await routeHandler(res, async () => {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  });
});

export default router;

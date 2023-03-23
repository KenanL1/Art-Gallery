import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// router.route('/').get((req: express.Request, res: express.Response) => {
//   res.status(200).json({ message: 'Hello from DALL-E!' });
// });

// Call OpenAI Text-to-Image API
router.route("/").post(async (req: express.Request, res: express.Response) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "Something went wrong" });
  }
});

export default router;

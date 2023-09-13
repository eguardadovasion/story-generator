require("dotenv").config();
const OpenAI = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();

app.use(cors());

app.get("/api/message", (req, res) => {
  res.json("Hello World!");
});

app.post("/api/stories", urlencodedParser, async (req, res) => {
  try {
    const message = req.body.message;
    console.log("\nMessage: ", message);
    const gptResponse = await generateStory(message);
    console.log("GPT Response: ", gptResponse);
    res.json(gptResponse);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

async function generateStory(message) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: process.env.SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
}

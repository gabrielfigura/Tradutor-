const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/translate", async (req, res) => {
  const { text, target } = req.body;

  try {
    const response = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source: "auto",
      target: target,
      format: "text"
    }, {
      headers: { "Content-Type": "application/json" }
    });

    res.json({ translatedText: response.data.translatedText });
  } catch (error) {
    console.error("Erro ao traduzir:", error.message);
    res.status(500).json({ translatedText: "Erro na tradução." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

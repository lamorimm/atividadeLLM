const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

const LLM_API_URL = process.env.LLM_API_URL;
const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_MODEL = process.env.LLM_MODEL;

// Rota para gerar historia
app.post("/gerar-historia", async (req, res) => {
  const { theme } = req.body;

  if (!theme) {
    return res.status(400).json({ error: "O tema é obrigatório." });
  }

  const prompt = `Escreva uma história curta, envolvente e criativa inspirada no tema: "${theme}". A narrativa deve conter um início cativante, um desenvolvimento interessante e um desfecho impactante. Use descrições vívidas e personagens memoráveis para prender a atenção do leitor. Responda em texto comum, sem usar caracteres especiais, apenas parágrafos.`;

  try {
    const response = await fetch(
      `${LLM_API_URL}/models/${LLM_MODEL}:generateContent?key=${LLM_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
          },
        }),
      }
    );

    // Verifica se a resposta da API foi bem-sucedida
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resposta de erro da API LLM:", errorText);
      return res
        .status(response.status)
        .json({ error: `A API LLM retornou um erro: ${errorText}` });
    }

    let data;
    try {
      // Tenta interpretar a resposta como JSON
      data = await response.json();
    } catch (jsonError) {
      const errorText = await response.text();
      console.error("Erro ao interpretar JSON da API LLM:", jsonError);
      console.error("Resposta bruta da API LLM:", errorText);
      return res.status(500).json({
        error: `Falha ao interpretar a resposta da API LLM como JSON. Resposta bruta: ${errorText}`,
      });
    }

    res.json({ story: data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error("Erro ao chamar o LLM:", error);
    res.status(500).json({ error: "Falha ao gerar a história." });
  }
});

app.listen(port, () => {
  console.log(`Gerador de histórias está rodando na porta: ${port}`);
});

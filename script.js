document.getElementById("translate-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = document.getElementById("text").value;
  const language = document.getElementById("language").value;
  const result = document.getElementById("result");

  result.innerText = "Traduzindo...";

  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, target: language }),
    });

    const data = await response.json();
    result.innerText = data.translatedText || "Erro na tradução.";
  } catch (error) {
    result.innerText = "Erro na tradução.";
  }
});

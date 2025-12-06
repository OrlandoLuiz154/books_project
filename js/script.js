// Seleciona elementos
const frm = document.getElementById("formCadastro");
const outResultado = document.getElementById("outResultado");

// Evento do formulário
frm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const autor = document.getElementById("inAutor").value.trim();

  if (!autor) {
    outResultado.textContent = "Digite um nome válido.";
    return;
  }

  // Monta a URL: /api/books/{author}
  const url = `https://booked-production.up.railway.app/api/books/${encodeURIComponent(
    autor
  )}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ autor }), // Corpo enviado para API
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const dados = await response.json();
    outResultado.textContent = "Autor cadastrado com sucesso!";
    console.log("Resposta da API:", dados);
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    outResultado.textContent = "Erro ao cadastrar autor (ver console).";
  }
});

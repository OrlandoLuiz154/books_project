const frm = document.getElementById("formCadastro");
const outResultado = document.getElementById("outResultado");

frm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const autor = document.getElementById("inAutor").value.trim();

  if (!autor) {
    outResultado.textContent = "Digite um nome válido.";
    return;
  }
  const url = "https://booked-production.up.railway.app/api/books";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ autor }),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Erro na requisição");
        return;
      }

      alert("Autor cadastrado com sucesso!");
    })
    .catch((erro) => {
      console.error("Erro ao cadastrar:", erro);
      outResultado.textContent = "Erro ao cadastrar autor (ver console).";
    });
});

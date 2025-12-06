let outResultado = document.getElementById("outResultado");
const frm = document.getElementById("formCadastro");

frm.addEventListener("submit", (e) => {
  e.preventDefault();

  let autor = document.getElementById("inAutor").value;

  const urlCadastro = `https://booked-production.up.railway.app/api/books/${autor}`;

  fetch(urlCadastro, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Retorno do cadastro:", data);
      outResultado.textContent = "Autor cadastrado com sucesso!";
      frm.reset();
    })
    .catch((error) => {
      console.error("Erro:", error);
      outResultado.textContent = "Erro ao cadastrar autor.";
    });
});

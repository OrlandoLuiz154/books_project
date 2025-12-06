let outResultado = document.getElementById("outResultado");
const frm = document.getElementById("formCadastro");

frm.addEventListener("submit", (e) => {
  e.preventDefault();

  let autor = document.getElementById("inAutor").value;

  const urlCadastro = `https://booked-production.up.railway.app/api/books/${autor}`;

  fetch(urlCadastro)
    .then(async (response) => {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
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

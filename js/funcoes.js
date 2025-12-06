const resultado = document.querySelector("#resultado");
const url = "https://booked-production.up.railway.app/api/books";

function ListarLivros() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Cliquei no botão!");
      resultado.innerHTML = "";

      if (data && Array.isArray(data.livros)) {
        data.livros.forEach((livro) => {
          const li = document.createElement("li");
          li.textContent = `${livro.autor} | ${livro.nome}`;
          resultado.appendChild(li);
        });
      } else {
        console.error("Formato inesperado:", data);
        resultado.innerHTML = "<li>Nenhum livro encontrado.</li>";
      }
    })
    .catch((error) => console.error("Erro:", error));
}

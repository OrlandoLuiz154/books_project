const resultado = document.querySelector("#resultado");
const url = "https://booked-production.up.railway.app/api/books";

function ListarLivros() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resultado.innerHTML = "";

      // Caso não encontre nada
      if (!data || !Array.isArray(data.livros)) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = "Nenhum livro encontrado.";
        td.colSpan = 2;
        tr.appendChild(td);
        resultado.appendChild(tr);
        return;
      }
      // ----- Cabeçalho da Tabela -----
      const header = document.createElement("tr");
      const thAutor = document.createElement("th");
      thAutor.textContent = "Autor";
      const thNome = document.createElement("th");
      thNome.textContent = "Livro";
      header.appendChild(thAutor);
      header.appendChild(thNome);
      resultado.appendChild(header);

      // ----- Linhas da tabela -----
      data.livros.forEach((livro) => {
        const tr = document.createElement("tr");
        const tdAutor = document.createElement("td");
        tdAutor.textContent = livro.autor;
        const tdNome = document.createElement("td");
        tdNome.textContent = livro.nome;
        tr.appendChild(tdAutor);
        tr.appendChild(tdNome);
        resultado.appendChild(tr);
      });
    })
    .catch((error) => console.error("Erro:", error));
}

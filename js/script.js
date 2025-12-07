const frmCadastro = document.getElementById("formCadastro");
const frmBuscarAutor = document.getElementById("formBuscarAutor");
const outResultado = document.getElementById("outResultado");

frmCadastro.addEventListener("submit", async (e) => {
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

      outResultado.textContent = "Autor cadastrado com sucesso!";
    })
    .catch((erro) => {
      console.error("Erro ao cadastrar:", erro);
      outResultado.textContent = "Falha ao cadastrar o autor";
    });
});

frmBuscarAutor.addEventListener("submit", (e) => {
  e.preventDefault();

  const autorInput = document.getElementById("inBuscarAutor").value.trim();

  if (!autorInput) {
    alert("Digite o nome do autor!");
    return;
  }

  const autorBusca = encodeURIComponent(autorInput);
  const url = `https://booked-production.up.railway.app/api/books/${autorBusca}`;

  const tabela = document.getElementById("resultadoBusca");
  tabela.innerHTML = "";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Caso não encontre nada
      if (!data || !Array.isArray(data.livros) || data.livros.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = "Nenhum livro encontrado.";
        td.colSpan = 2;
        tr.appendChild(td);
        tabela.appendChild(tr);
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
      tabela.appendChild(header);

      // ----- Linhas da tabela -----
      data.livros.forEach((livro) => {
        const tr = document.createElement("tr");

        const tdAutor = document.createElement("td");
        tdAutor.textContent = livro.autor;

        const tdNome = document.createElement("td");
        tdNome.textContent = livro.nome;

        tr.appendChild(tdAutor);
        tr.appendChild(tdNome);

        tabela.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Erro na busca do autor:", error);
    });
});

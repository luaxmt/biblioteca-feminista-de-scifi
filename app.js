function pesquisar() {
    // Obtém a seção HTML onde os resultados serão exibidos.
    let section = document.getElementById("resultados-pesquisa"); // Seleciona o elemento onde os resultados serão exibidos
    
    let campoPesquisa = document.getElementById("campo-pesquisa").value

    if (!campoPesquisa) {
        section.innerHTML = "<p>Digite algo para buscar.</p>"
        return
    }

    campoPesquisa = campoPesquisa.toLowerCase()
    
    let resultados = ""; // String para armazenar o HTML dos resultados
  
    // Itera sobre cada dado da lista de dados
    for (const dado of dados) {
        const campos = [dado.nome, dado.subgenero, dado.obras.join(''), dado.tags.join('')]


        if (campos.some(campo => campo.toLowerCase().includes(campoPesquisa))
        ) {
            // Cria um novo elemento HTML para cada dado e adiciona suas informações
        resultados += `
        <div class="item-resultado">
            <h2>
            ${dado.nome}
            </h2>
            <p class="descricao-meta">${dado.bio.join('<br />')}</p>
            <p class="descricao-meta">Subgêneros: ${dado.subgenero}</p>
            <p class="descricao-meta">Principais obras: ${dado.obras.join(', ')}</p>
            ${dado.adaptacoes.length ? `<p class="descricao-meta">Adaptações: ${dado.adaptacoes.join(', ')}</p>` : ""}
            <img src="${dado.foto}" />
        </div>
        `;
        }
    }
  
    if (!resultados) {
        section.innerHTML = "<p>Não há nada para mostrar.</p>"
        return
    }

    section.innerHTML = resultados; // Atribui os resultados gerados à seção HTML
  }
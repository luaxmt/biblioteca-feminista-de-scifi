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

  (function() {
    const tags = []

    for (dado of dados) {
        tags.push(...dado.tags)
    }

    const orderedTags = orderTags(tags).slice(0, 5)

    const tagsEl = document.getElementById('tags')
        orderedTags.forEach(tag => {
            tagsEl.innerHTML += `<li>${tag}</li>`
         })
  })()


  function orderTags(tags) {
    const contagem = tags.reduce((acc, palavra) => {
        acc[palavra] = (acc[palavra] || 0) + 1;
        return acc;
    }, {});
  
  // Converter o objeto de contagem em um array de objetos
  const paresChaveValor = Object.entries(contagem);
  
  // Ordenar o array por contagem em ordem decrescente
  const ordenado = paresChaveValor.sort((a, b) => b[1] - a[1]);
  
  // Extrair apenas as palavras do array ordenado
  const resultado = ordenado.map(([palavra]) => palavra);
  
  return resultado;
}
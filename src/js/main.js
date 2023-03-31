const list = document.getElementById('pokeList');
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 386
const limit = 10
let offset = 0;

function convertToType(pokemonTypes){
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertToList(pokemon) {
    return `            
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li> 
    `
}

function loadPokemonItens(offset, limit){
    resultApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertToList).join('')
        list.innerHTML += newHtml   
    })
}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
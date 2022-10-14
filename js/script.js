const pokemonName = document.querySelector('.name_pokemon');
const pokemonNumero = document.querySelector('.number_pokemon');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const imput = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let pokemonAtual = 1;

const apiGeral = async (pokemon) => {
    const APIResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResposta.status === 200) {
        const data = await APIResposta.json();
        return data;
    }
}

const renderizarPokemon = async (pokemon) => {
    const data =await apiGeral(pokemon);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumero.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        imput.value = '';
        pokemonAtual = data.id;
    } else {
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumero.innerHTML = '';
        pokemonImage.style.display = 'none';
        imput.value = '';
    }
    

}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderizarPokemon(imput.value.toLowerCase());

});

buttonPrev.addEventListener('click', () => {
    if (pokemonAtual > 1) {
        pokemonAtual -= 1;
        renderizarPokemon(pokemonAtual);
    }
});
  
buttonNext.addEventListener('click', () => {
    pokemonAtual += 1;
    renderizarPokemon(pokemonAtual);
});

renderizarPokemon(pokemonAtual);
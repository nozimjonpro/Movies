const elFilmForm = document.querySelector('.film__from');
const elFilmSelect = document.querySelector('.film__select');
const elFilmList = document.querySelector('.film__list');
const elFilmTemplate = document.querySelector('#film__template').content;
const elFilmGenresTemplate = document.querySelector('#film-genres__template').content;

// Rendering Genres

function renderGenre(genresArr, genresList){
    genresList.innerHTML = null;
    genresArr.forEach(genre => {
        let genresTemplate = elFilmGenresTemplate.cloneNode(true);
        genresTemplate.querySelector('.film__genre').textContent = genre;
        genresList.appendChild(genresTemplate)
    })
}

// Element Creating

function elementCreater(element){
    let newOPtionElement = document.createElement('option');
    newOPtionElement.value = 'All'
    newOPtionElement.textContent = "All"
    element.appendChild(newOPtionElement);
}

// Normalizing date

function normalizeDate(format){
    let filmDate = new Date(format);
    let day = String(filmDate.getDate()).padStart(2, 0);
    let month = String(filmDate.getMonth()+1).padStart(2, 0)
    let year = filmDate.getFullYear()
    return day + '.' + month + '.' + year;
}

// Rendering Films 

function renderFilm(array, element){
    element.innerHTML = null;
    array.forEach(film => {
        let filmTemplate = elFilmTemplate.cloneNode(true);
        filmTemplate.querySelector('.film__heading').textContent = film.title;
        filmTemplate.querySelector('.film__image').src = film.poster;
        filmTemplate.querySelector('.film__overview').textContent = film.overview;
        filmTemplate.querySelector('.film__time').textContent = normalizeDate(film.release_date);

       const elGenres = filmTemplate.querySelector('.film__genres')

       renderGenre(film.genres, elGenres)


        element.appendChild(filmTemplate)
    });
}

// Rendering Select

function renderSelect(array, select){
const result = [];

array.forEach(film =>{
    film.genres.forEach(genre =>{
        if(!result.includes(genre)){
            result.push(genre)
        }
    })
})

result.forEach(newGenre =>{
    let newOption = document.createElement('option');
    newOption.textContent = newGenre;
    newOption.value = newGenre;
    select.appendChild(newOption)
})
}

// Events

elFilmSelect.addEventListener('change', (evt)=>{
const genreInput = evt.target.value.trim();

const filteredFilms = films.filter(film=>film.genres.includes(genreInput))
renderFilm(filteredFilms, elFilmList);

if(genreInput === 'All'){
    renderFilm(films, elFilmList)
}
})

// Initializing fuctions

elementCreater(elFilmSelect)
renderSelect(films, elFilmSelect)
renderFilm(films, elFilmList)
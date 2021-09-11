'use strict';

const inputSearch = document.querySelector('.js_input');
const searchButton = document.querySelector('.js_searchButton');
const listDataContainer = document.querySelector('.js_listData');
const favListsData =document.querySelector('.js_favListsData');

let listsData = [];
//7.a.creamos un nuevo array para las series favoritas:
let favouriteListsData = [];

function paintFavouriteListData() {
  let html2 = '';
  for(const favData of favouriteListsData){
    if (favData.show.image !== null){
      html2 += `<li id="${favData.show.id}" class="js_liListData">`;
      html2 += `<div class="js_listImageContainer">`;
      html2 += `<h3>${favData.show.name}</h3>`;
      html2 += `<img src="${favData.show.image.medium}" class="js_image"/>`;
      html2 += `</div>`;
      html2 += `</li>`;
    }else{
      html2 += `<li id="${favData.show.id}" class="js_liListData"> `;
      html2 += `<div class="js_listImageContainer">`;
      html2 += `<h3>${favData.show.name}</h3>`;
      html2 += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV}" class="js_image"/>`;
      html2 += `</div>`;
      html2 += `</li>`;
    }
  }
  favListsData.innerHTML = html2 ;
  listenListData();
}
//7. creamos la función manejadora del click sobre cada elemento:
function handleClickListData(ev){
  const selectedElement =parseInt(ev.currentTarget.id);
  //7.b buscamos aquellos elementos del listData que tengan el id de opcion clickada por el usuario:
  const selectedSerieId = listsData.find ((listData)=>{
    return listData.show.id === selectedElement;
  });
  //7.d hemos de hacer que no se añada al array una serie ya seleccionada:
  const isFavourite = favouriteListsData.findIndex ((fav)=>{
    return fav.show.id === selectedElement;
  });
  //7.c añadimos los elementos clickados al array de favoritos siempre que su index===-1:
  if(isFavourite===-1){
    favouriteListsData.push(selectedSerieId);
  }else{//eliminamos el que ya esté añadido:
    favouriteListsData.splice(isFavourite,1);
  }paintFavouriteListData();
  paintListData();
}


//8. buscamos si el elemento es o no ya un favorito )arriba):


//6.hemos de escuchar el click sobre cada elemento de la lista:
function listenListData (){
  const listsDataElement=document.querySelectorAll('.js_liListData');
  for(const listDataElement of listsDataElement){
    listDataElement.addEventListener('click', handleClickListData);
  }
}
//9. creamos una función que vuelva a verificar si el li es o no favorito, para añadirle la clase:
function liFav(listData){
  const isFavourite = favouriteListsData.find ((fav) =>{
    return fav.show.id ===  listData.show.id;
  });
  if (isFavourite === undefined){
    return false;
  }else {
    return true;
  }
}

//5.definimos la función que pinta los datos de la lista:
function paintListData() {
  let html = '';
  //9.1 creamos una variable que recoge la clase aplicada cuando sea marcado como favorito:
  let favClass= '';
  for(const listData of listsData){
    //creamos una constante y creamos la condición por la que sólo is es favorita,  será añadida la clase.
    const isFav = liFav(listData);
    if(isFav){
      favClass='clickSeries';
    }else{
      favClass='';
    }
    if (listData.show.image !== null){
      html += `<li id="${listData.show.id}" class="js_liListData ${favClass}">`;
      html += `<div class="js_listImageContainer">`;
      html += `<h3>${listData.show.name}</h3>`;
      html += `<img src="${listData.show.image.medium}" class="js_image"/>`;
      html += `</div>`;
      html += `</li>`;
    }else{
      html += `<li id="${listData.show.id}" class="js_liListData"> `;
      html += `<div class="js_listImageContainer">`;
      html += `<h3>${listData.show.name}</h3>`;
      html += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV}" class="js_image"/>`;
      html += `</div>`;
      html += `</li>`;
    }
  }
  listDataContainer.innerHTML = html ;
  listenListData();
}
//10.a añadimos la info al LS:
function setInLocalStorage (){
  const stringFavouriteListsData =  JSON.stringify(favouriteListsData);
  localStorage.setItem ('favouriteListsData', stringFavouriteListsData);
}

//10.creamos una función que recoge lo que viene del local storage:
function getFromApi(){
  let inputValue = inputSearch.value.toLowerCase();
  //1.solicitamos al api los datos:
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      listsData = data;
      //4.llamamos a la función que pintará los datos de la lista:
      paintListData();
      setInLocalStorage();
    });
}
//10.b creamos una función que nos permita llamar a la info guardada en el LS:
function getLocalStorage (){
  const localStorageListsData = localStorage.getItem ('favouriteListsData');
  if(localStorageListsData ===null){
    getFromApi();
  }else{
    const arrayListsData = JSON.parse (localStorageListsData);
    favouriteListsData = arrayListsData;
    paintFavouriteListData();
    paintListData();
  }
}
//3. creamos la función manejadora del botón de búsqueda:
function handleSearchButton(ev) {
  ev.preventDefault ();
  getFromApi();
}
//2.creamos evento sobre el botón de búsqueda:
searchButton.addEventListener('click', handleSearchButton);

//12.ejecutamos la función que llama a lo guardado en el ls:
getLocalStorage();



//# sourceMappingURL=main.js.map

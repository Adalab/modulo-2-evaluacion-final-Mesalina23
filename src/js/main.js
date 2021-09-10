'use strict';

const inputSearch = document.querySelector('.js_input');
const searchButton =  document.querySelectorAll ('.js_searchButton');

let listData= [];


function handleSearchButton (){
  let inputValue = inputSearch.value.toLowerCase();

  fetch (`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then ((response)=> response.json())
    .then ((data)=>{
      listData = data;
      paintListData();
    });
}

function paintListData(){

}

/*searchButton.addEventListener('click',handleSearchButton);*/



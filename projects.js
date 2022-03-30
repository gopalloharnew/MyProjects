console.log("Visit my Projects");

const searchInput = document.querySelector(".search-input");
const crossButton = document.querySelector(".cross-button");

searchInput.addEventListener('input', ()=> {
    q = searchInput.value.trim().toLowerCase();
    console.log(q);
})

crossButton.addEventListener('click', ()=>{
    searchInput.value = "";
    searchInput.focus();
})
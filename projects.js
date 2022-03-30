console.log("Visit my Projects");

const searchInput = document.querySelector(".search-input");
const crossButton = document.querySelector(".cross-button");
const resultCardTemplate = document.querySelector(".result-card-template");
const searchResultBox = document.querySelector(".search-result-box");


const projects = []

// rendering card with github api 

function creatCard(title, description, htmlLink, pageExist, pageLink){
    const card = resultCardTemplate.content.cloneNode(true).children[0];

    // title
    let rTitle = card.querySelector('.r-title');
    rTitle.innerText = title;
    if(pageExist){rTitle.href = `https://gopalloharnew.github.io/${title}`;}
    else{rTitle.href = pageLink}

    // description
    let rDesc = card.querySelector('.r-desc');
    rDesc.innerText = description;

    // links
    let links = card.querySelector('.links');
    let htmlLinkA = card.querySelector('.html-link');
    htmlLinkA.href = htmlLink;
    let pageLinkA = card.querySelector('.page-link');
    if(pageExist){pageLinkA.href = `https://gopalloharnew.github.io/${title}`;}
    else{pageLinkA.classList.add("hide");}

    return card;
}

fetch("https://api.github.com/users/gopalloharnew/repos").then((res) => res.json()).then((data) => {
    searchResultBox.innerHTML = "";
    for (let k = 0; k < data.length; k++) {
        const inProject = data[k];

        let newProject = {};
        newProject.name = inProject.name;
        newProject.description = inProject.description;
        newProject.html_url = inProject.html_url;
        newProject.has_pages = inProject.has_pages;
        newProject.html_url = inProject.html_url;
        projects.push(newProject);
    }

    for (let p = 0; p < projects.length; p++) {
        const project = projects[p];
        let createdCard = creatCard(project.name, project.description, project.html_url, project.has_pages, project.html_url);
        project.card = createdCard;
        searchResultBox.append(createdCard);
    }
    
});

// search

searchInput.addEventListener('input', ()=> {
    q = searchInput.value.trim().toLowerCase();
    projects.forEach(project => {
        let hideOrNot = !(project.name.trim().toLowerCase().includes(q) || project.description.trim().toLowerCase().includes(q));
        project.card.classList.toggle('hide', hideOrNot);
    });

    crossButton.classList.toggle('hide', !searchInput.value);
})

crossButton.addEventListener('click', ()=>{
    searchInput.value = "";
    searchInput.focus();
    projects.forEach(project => {project.card.classList.remove('hide')});
});

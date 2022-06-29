

//paso3) utilizamos Fragment o Template para pintar la informacion en el Dom
const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
console.log(templateCard);

//paso 2) utilizamos DOMContentLoaded cuando toda la pagina esta cargada 
document.addEventListener('DOMContentLoaded', ()=>{
    fetchData();
})


// paso1) utilizamos fetch y mostramos la informacion consumida por consola
const fetchData = async () => {
    try {
        const res = await fetch ('api.json');
        const data = await res.json();  //transforma la informacion traida de la api a Objeto
        // console.log(data);  
        pintarCards(data);
    } catch (error) {
        console.log(error)
    }
}


//paso 3-b) creamos una funcion que muestra la data en pantalla, o por consola
const pintarCards = data => {
    data.forEach(producto =>{
        templateCard.querySelector('h5').textContent = producto.title;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment)
}




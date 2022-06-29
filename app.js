

//paso3) utilizamos Fragment o Template para pintar la informacion en el Dom
const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

//paso 4-c) agregar productos al carrito, creamos objeto vacio
let carrito = {}


//paso 2) utilizamos DOMContentLoaded cuando toda la pagina esta cargada 
document.addEventListener('DOMContentLoaded', ()=>{
    fetchData();
})

//paso 4)creando Carrito: capturamos un evento click que ejecuta una funcion
items.addEventListener('click',e =>{
   addCarrito(e)
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
    console.log(data)
    data.forEach(producto =>{
        templateCard.querySelector('h5').textContent = producto.title;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl);

        //generamos id con id que viene de la Api
        templateCard.querySelector('.btn-dark').dataset.id = producto.id;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
        console.log(producto.thumbnailUrl);
    })
    items.appendChild(fragment); 
}


//4-b) creamos una funcion que captura un evento click, y muestra un elemento del html 
const addCarrito = e =>{
    // console.log(e.target)    
    // console.log(e.target.classList.contains('btn-dark'))     // valida si el elemento contiene la propiedad que pasamos por parametro
    if(e.target.classList.contains('btn-dark')){   //detectamos el boton y utilizamos el producto.id
        // console.log(e.target.parentElement) //parentElement me muestra el elemento padre, en este caso el div padre
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation()

}

//4-d) creamos una funcion que manipule nuestro objeto carrito
const setCarrito = objeto => {
    // console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id
    }
    console.log(producto)
}
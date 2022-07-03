

//paso3) utilizamos Fragment o Template para pintar la informacion en el Dom
const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
// 5-a) **guardamos todos los id** templates footer y carrito. y elementos 'items' y 'footer' 
const footer = document.getElementById('footer');
const items = document.getElementById('items');
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;

const fragment = document.createDocumentFragment();

//paso 4-c) agregar productos al carrito, creamos objeto vacio
let carrito = {}

//eventos

//paso 2) utilizamos DOMContentLoaded cuando toda la pagina esta cargada 
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})
//paso 4)creando Carrito: capturamos un evento click que ejecuta una funcion
cards.addEventListener('click', e => {
    addCarrito(e)
})
//5-a) creamos evento para capturar click de botones de aumentar y disminuir  //no se por que lo saco de items
items.addEventListener('click', (e) => {
    btnAccion(e)
})

// paso1) utilizamos fetch y mostramos la informacion consumida por consola
const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();  //transforma la informacion traida de la api a Objeto
        // console.log(data);  
        pintarCards(data);
    } catch (error) {
        console.log(error)
    }
}


//paso 3-b) creamos una funcion que muestra la data en pantalla, o por consola
const pintarCards = data => {
    // console.log(data)
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl);

        //generamos id con id que viene de la Api
        templateCard.querySelector('.btn-dark').dataset.id = producto.id;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
        console.log(producto.thumbnailUrl);
    })
    cards.appendChild(fragment);
}


//4-b) creamos una funcion que captura un evento click, y muestra un elemento del html 
const addCarrito = e => {
    // console.log(e.target)    
    // console.log(e.target.classList.contains('btn-dark'))     // valida si el elemento contiene la propiedad que pasamos por parametro
    if (e.target.classList.contains('btn-dark')) {   //detectamos el boton y utilizamos el producto.id
        // console.log(e.target.parentElement) //parentElement me muestra el elemento padre, en este caso el div padre
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation()   //detenemos la propagacion del evento 

}

//4-d) creamos una funcion que manipule nuestro objeto carrito
const setCarrito = objeto => {
    //  console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,     //identifica el id del elemento clickeado
        title: objeto.querySelector('h5').textContent,         // el ttulo
        precio: objeto.querySelector('p').textContent,          // el precio
        cantidad: 1                                             // la cantidad la dejamos en 1, luego aumentara
    }
    //4-e) aumentar el numero de productos en el carrito, al presionar Comprar       //Carrito es toda nuestra coleccion de objetos. Estamos accediendo sólo al elemento que se está repitiendo. Una vez que accedemos, accedemos solamente a la cantidad, y la aumentamos en 1. Si este producto no exixte, por defecto la cantidad sera 1. 
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    //una vez que tenemos el objeto tenemos que pushearlo al carrito. Estamos haciendo una coleccion de objetos indexados. 
    carrito[producto.id] = { ...producto }    //spread operator, aqui estamos haciendo una 'copia' de producto
    console.log(carrito)
    pintarCarrito();  //5)
}

//5) template: carrito de compras mostrado en la pagina
// 5-a) generamos los templates

// 5-b) pintar carrito en el Dom, creamos funcion para ello. usamos **template-carrito**
// 5-b) hacemos un forEach del Objeto carrito, utilizamos Object.values por ser un objeto
const pintarCarrito = () => {
    // console.log(carrito)
    items.innerHTML = ' '    //5-d) items debe partir vacio por cada vez que ejecutamos pintar Carrito(0)
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id  //editando contenido de tag 'th'
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        //clonando el carrito, utilizamos el fragment
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone);   // ?
    })
    // 5-c)Pintamos la informacion
    items.appendChild(fragment)
    pintarFooter()   //6)
}

//terminado 5-c) hasta aqui funciona todo bien excepto que al repetir un producto, lo muestra dos veces
//5-d) corregimos ese detalle, sucede porque no estamos limpiando nuestro html


// 6)template-footer
// 6-a) generamos los template, vamos a buscar el id guardado
const pintarFooter = () => {
    footer.innerHTML = ''    //iniciamos footer en 0
    //debemos preguntar si nuetro carrito esta vacio, si es true entra el if:
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = ` <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return   //no olvidar return para que se salga de la funcion
    }
    //7) si no esta vacio pintamos footer, sumando cantidades y totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)    //este acumuldador, por cada iteracion va a ir acumulando lo que nosotros hagamos como suma
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    console.log(nPrecio)
    // console.log(nCantidad)

    //8) pintamos la ultima funcionalidad en el footer(suma de cantidades y totales)
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    //9) Evento vaciar carrito
    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {};   //vaciamos el objeto carrito
        pintarCarrito();
    })
}

//10) botones aumentar y disminuir cantidad. Usaremos Event Delegation
//10-a) buscamos los id de los botones y vemos donde se guardaron  b)creamos funcion de accion
const btnAccion = e => {
    // console.log(e.target)  //vemos la info de los elementos en consola al presionar cualquier cosa 
    //Accion de aumentar
    if (e.target.classList.contains('btn-info')) {    //utilizamos objetos indexados
        console.log(carrito[e.target.dataset.id])    //esto que sale en console.log lo asigno a const producto
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++ // aumentamos la cantidad en 1.
        // ahora decimos 'este carrito' , en su id, va a ser una 'copia' de producto
        carrito[e.target.dataset.id] = { ...producto }    //con esto se van agregando elementos a productos

        pintarCarrito();
    }

    //Accion de disminuir
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        //cuando la cantidad sea 0, eliminar el elemento 
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito();
    }
    e.stopPropagation();
}




//paso 2) utilizamos DOMContentLoaded cuando toda la pagina esta cargada y todos los elementos cargados en el Dom
//entonces generamos un evento cuando esto pasa y ejecutamos una accion
document.addEventListener('DOMContentLoaded', ()=>{
    fetchData();
})


// paso1) utilizamos fetch y mostramos la informacion consumida por consola
//utilizamos async , try y catch
const fetchData = async () => {

    try {
        const res = await fetch ('api.json');
        const data = await res.json()    //transforma la informacion traida de la api y la transforma en objeto Javascript
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}


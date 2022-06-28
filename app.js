// utilizamos fetch y mostramos la informacion consumida por consola
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


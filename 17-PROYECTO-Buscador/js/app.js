//Variables

const marca = document.getElementById("marca")
const year = document.getElementById("year")
const precioMin = document.getElementById("minimo")
const precioMax = document.getElementById("maximo")
const puertas = document.getElementById("puertas")
const transmision = document.getElementById("transmision")
const color = document.getElementById("color")

//contenedor resultado
const resultado = document.getElementById("resultado")


const maxYear = new Date().getFullYear(); // Seleccionamos el año actual
const minYear = maxYear - 10; //Establecemos el año menor

//Generar objeto datosBusqueda

const datosBusqueda = {
    marca: "",
    year: "",
    precioMIn: "",
    precioMax: "",
    puertas: "",
    color: "",
    transmision: ""
}




//Eventos
window.onload = () => {
    mostrarAutos(autos); // muestra los datos al cargar la pagina

    llenarSelect(); // cargamo los años en el select
}


marca.addEventListener("change", () => {
    datosBusqueda.marca = marca.options[marca.selectedIndex].value;
    filtrarCoches();
})

year.addEventListener("change", (e) => {
    datosBusqueda.year = e.target.value;
    filtrarCoches();

})
precioMin.addEventListener("change", (e) => {
    datosBusqueda.precioMIn = e.target.value;
    filtrarCoches();
})
precioMax.addEventListener("change", (e) => {
    datosBusqueda.precioMax = e.target.value;
    filtrarCoches();
})

puertas.addEventListener("change", (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarCoches();

})
color.addEventListener("change", (e) => {
    datosBusqueda.color = e.target.value;
    filtrarCoches();

})

transmision.addEventListener("change", (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarCoches();

})







//FUNCIONES

//Funcion para mostar los datos en el html
function mostrarAutos(autos) {

    limpiarHtml();


    //En el caso que no hubiese datos que mostrar
    if (autos == "") {
        let p = document.createElement("P");
        p.textContent = "No hay coches con los criterios seleccinados"
        p.style.color = "red"
        p.style.backgroundColor = "yellow"
        resultado.append(p)
    }



    autos.forEach(auto => {
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;

        let p = document.createElement("P");
        p.textContent = `
                ${marca} ${modelo} - año ${year} - precio: ${precio}€ - ${puertas} puertas - color: ${color} transmision: ${transmision}
                `
        resultado.append(p)

    })
}


//Funcion para limpiar el html antes de pintar los datos
function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }


}


//Función para rellenar el select con los ultimo 10 años
const llenarSelect = () => {
    for (let i = maxYear; i >= minYear; i--) {
        let option = document.createElement("OPTION");
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }

}

//Función para filtar los coches
const filtrarCoches = () => {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

    //llamamos a la funcion  mostar autos y le pasamos el resultado como parametro
    mostrarAutos(resultado);
}

//Filtros....

const filtrarMarca = (autos) => {
    if (datosBusqueda.marca) {
        return autos.marca === datosBusqueda.marca
    } else
        return autos

}

const filtrarYear = (autos) => {
    if (datosBusqueda.year) {
        return autos.year == datosBusqueda.year
    } else
        return autos

}

const filtrarMinimo = (autos) => {
    if (datosBusqueda.precioMIn) {
        return autos.precio > datosBusqueda.precioMIn
    } else
        return autos

}

const filtrarMaximo = (autos) => {
    if (datosBusqueda.precioMax) {
        return autos.precio < datosBusqueda.precioMax
    } else
        return autos

}

const filtrarPuertas = (autos) => {
    if (datosBusqueda.puertas) {
        return autos.puertas == datosBusqueda.puertas
    } else
        return autos

}

const filtrarTransmision = (autos) => {
    if (datosBusqueda.transmision) {
        return autos.transmision === datosBusqueda.transmision
    } else
        return autos

}

const filtrarColor = (autos) => {
    if (datosBusqueda.color) {
        return autos.color ===
            datosBusqueda.color
    } else
        return autos

}






//El metodo filter nos permiter iterar un objeto y filtrar. Se pueden encadenar filtros
// al metodo filter le pasamos una función y dentro de esta que recibe el objeto a iterar
// hacemos el filtrado. Los formularios nos devuelven todo los datos como String por lo que si 
// estamos tabajando con otro dato hat que parsearlo o bien pner == en lugar de ===
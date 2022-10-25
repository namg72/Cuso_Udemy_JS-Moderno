const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos ');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrio = document.querySelector('#vaciar-carrito');
let arrayCursos = [];




//FUNCION AGREGAR CURSO
function agregarCurso(e) {

    //prevenimos que la pagina retonre arriba al clicar en un enlace
    e.preventDefault();

    //con esto hacelmos que sole se ejecute el codigo al pinchar en el boton no dentro de todo el div
    if (e.target.classList.contains("agregar-carrito")) {
        let cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }

}



//FUNCION LEEER DATOS CURSO
function leerDatosCurso(curso) {

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        nombre: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        cantidad: 1,
        id: curso.querySelector('a').getAttribute('data-id')


    }

    //comprobamos si el curso ha exite en el carrito
    const existe = arrayCursos.some(curso => curso.id === infoCurso.id);
    console.log(existe);
    if (existe) {
        //Actualizamos la cantidad
        const cursos = arrayCursos.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna objeto acutalizado 
            } else {
                return curso; //retorna los objetos no actualizado  
            }
        });

        arrayCursos = [...cursos]
    } else {

        arrayCursos = [...arrayCursos, infoCurso]

    }

    mostrarCarrito(arrayCursos);



}

//FUNCION PINTAR CARRITO HTML
function mostrarCarrito() {
    limpiarCursos()

    for (let curso of arrayCursos) {
        let row = document.createElement("TR");

        row.innerHTML = `
        <td><img src="${curso.imagen}" style="width:100px"></td>
        <td>${curso.nombre}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">
        `;
        contenedorCarrito.append(row)
    }
}

//FUNCION BORRAR CURSO
function borrarCurso(e) {
    e.preventDefault();
    console.log(e);
    if (e.target.classList.contains("borrar-curso")) {

        const cursoID = e.target.getAttribute("data-id")

        arrayCursos = arrayCursos.filter(curso => curso.id !== cursoID);

        mostrarCarrito();
    }

}






//FUNCION PARA  LIMPIAR EL HTML
function limpiarCursos() {

    //Forma lenta de hacerlo, menos eficiente
    contenedorCarrito.innerHTML = ""

    //Forma recomendada
    /*  while (contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito)
     } */
}



//EVENTOS
//evento boton agregar curso
listaCursos.addEventListener("click", agregarCurso);

//evento eliminar curso
carrito.addEventListener("click", borrarCurso)

//evento borrar cursos html
btnVaciarCarrio.addEventListener("click", limpiarCursos)
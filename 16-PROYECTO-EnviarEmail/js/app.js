// Referenciamos los inputs

const inputEmail = document.querySelector("#email");
const inputAsunto = document.querySelector("#asunto");
const inputMensaje = document.querySelector("#mensaje");
const buttonSubmit = document.querySelector('#formulario button[type="submit"]');
const buttonReset = document.querySelector('#formulario button[type="reset"]');
const spinner = document.getElementById("spinner");
const formulario = document.querySelector("#formulario");

const email = {
    email: '',
    asunto: '',
    mensaje: ''
}


// Eventos

inputEmail.addEventListener("blur", validarInputs);
inputAsunto.addEventListener("blur", validarInputs);
inputMensaje.addEventListener("blur", validarInputs);
buttonReset.addEventListener("click", borrarCampos);
buttonSubmit.addEventListener("click", enviarMail);




// FUNCIONES

// Funicon validar inputs
function validarInputs(e) {

    // referenciamos el contenedor del input que dispara el evento y el nombre del imput
    let contenedor = document.getElementById(e.target.id).parentElement;
    let campo = e.target.id;

    // mensaje para inculir en la alerta
    let textoError = `El campo ${campo} no puede estar vacio`

    if (e.target.value.trim() == "") {
        mostrarAlerta(e, contenedor, textoError);
        //limpiamos el atriubto del objto email y lo volvemos a aisgnar
        email[campo] = ""; //reiniciamos el input
        habilitarEnviar();
        return; //detiene la ejecucio n de codigo
    }

    // validamos que el email sea correcto solo si el evento se produce en el input email
    if ((e.target.id == "email") && (!validarEmail(e.target.value))) {
        textoError = " Email no valido !!!"
        mostrarAlerta(e, contenedor, textoError)
        email[campo] = ""; //reiniciamos el inpjut
        habilitarEnviar();
        return;
    }

    // limpiamos la alerta si pasa validacion y
    limpiarAlerta(e, contenedor)

    // les pasamos el valor de los imputs al objeto email quitandoles los espacios en blanco
    email[campo] = e.target.value.trim();

    // habilitamos el boton enviar
    habilitarEnviar();

    console.log(email);
}



// Funcion mostrar mensaje error
function mostrarAlerta(e, contenedor, textoError) {

    // referenciamos el nombre del elemento que dispara el evento
    let id = e.target.id;

    // limpiamos la alerta para no duplicarlas
    limpiarAlerta(e, contenedor);

    // creamos el elemento a insertar y le añadimos la clase alerta
    let error = document.createElement("P");
    error.textContent = textoError;
    error.style.cssText = 'background-color: red; color: white';
    error.classList.add("alerta")

    // insertamos el errorven el contenedor del input que dispara el envento
    contenedor.appendChild(error);

}

// Funcion elminar la alerta
function limpiarAlerta(e, contenedor) {

    // comprobamos si el contenor tiene la clase alerta si la tiene la borramos
    alerta = contenedor.querySelector(".alerta");

    if (alerta) {
        alerta.remove();
    }

}

// Funcion validar formato email
function validarEmail(email) {

    // Expresion regular para validar email
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    let result = regex.test(email);

    return result;

}

// funcion para habilitar el boton enviar 
function habilitarEnviar() {

    if (Object.values(email).includes("")) {
        buttonSubmit.classList.add("opacity-50");
        buttonSubmit.disabled = true;

    } else {
        buttonSubmit.classList.remove("opacity-50");
        buttonSubmit.disabled = false;

    }
}

// funcion borrar campos formulario
function borrarCampos() {
    //por defecto los botones type resest borran los campos de un formulario


    //vaiamos el objeto
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    //al vaciar los campos si llamamos a la funicon habiliar desmarcamos otra vez el boton enviar
    habilitarEnviar();

    console.log(email);
}

//Funcion que simula enviar el email
function enviarMail(e) {

    //prevenimos el comportamiento pro defedto
    e.preventDefault();

    //hacemos que aparezca el spinner
    spinner.classList.remove("hidden")

    setTimeout(() => {
        spinner.classList.add("hidden") //ocultamos spiner

        formulario.reset(); //borramos formulario

        borrarCampos(); //vaciamos el objeto email

        //Texto de enviar mail
        const mensajeExito = document.createElement("P");
        mensajeExito.textContent = "Email enviado correctamente";
        mensajeExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
            'font-bold', 'text-sm', 'uppercase');
        formulario.appendChild(mensajeExito)

        setTimeout(() => {
            mensajeExito.remove()
        }, 3000);

    }, 3000);

}
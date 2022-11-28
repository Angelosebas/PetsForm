export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) { 
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    } else {
        input.parentElement.classList.add("input.container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "El campo de nacimiento no puede estar vacio",
        customError : "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo de numero no puede estar vacio",
        patternMismatch: "El número requerido es XXXX-XXXX es de 8 números",
    },
    direccion: {
        valueMissing: "El campo de direccion no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
    },
    ciudad: {
        valueMissing: "El campo de ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 4 a 20 caracteres.",
    },
    estado: {
        valueMissing: "El campo de estado no puede estar vacio",
        patternMismatch: "El estado debe contener entre 4 a 30 caracteres.",
    },
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoDeErrores.forEach( error => {
        if(input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje)  //Con esta función se puede modificar el mensaje de advertencia 
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
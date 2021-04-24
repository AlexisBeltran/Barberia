//Id de data-set button
let Pagina = 1;

document.addEventListener('DOMContentLoaded', () =>{
    IniciarApp();
});

function IniciarApp(){
    mostrarServicios();
    mostrarSeccion();
    ocultarSeccion();
    paginaSiguiente();
    paginaAnterior();
    botonPaginador();
}

function mostrarSeccion(){
    //Eliminando Seccion 
    //Comprobamos si existe esa clase
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if(seccionAnterior){
        document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');
    }
    //Eliminar la clase actual del tab anterior
    //Comprobamos si existe esa clase
    const tabAnterior =  document.querySelector('.tabs .actual');
    if(tabAnterior){
        document.querySelector('.tabs .actual').classList.remove('actual');
    }
    //Agregamos la clase mostrar seccion mediante el id de pagina
    const PaginaActual = document.querySelector(`#paso-${Pagina}`);
    PaginaActual.classList.add('mostrar-seccion');
    //Eliminando clase actual
    document.querySelector(`[data-paso="${Pagina}"]`).classList.remove('actual');
    //Resaltar TAB actual 
    const TabActual = document.querySelector(`[data-paso="${Pagina}"]`);
    TabActual.classList.add('actual');
}

function ocultarSeccion(){
    const Botones = document.querySelectorAll('.tabs button');
    Botones.forEach( boton =>{
        boton.addEventListener('click', e => {
            e.preventDefault();
            Pagina = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonPaginador();
        });
    });
}
async function mostrarServicios(){
    try{
        const Archivo = './servicios.json';
        const Resultado = await fetch(Archivo);
        const db = await Resultado.json();
        const {servicios} = db;
        //Generar el HTML
        servicios.forEach(servicio => {
            const { id, nombre, precio } = servicio;
            //Generar el nombre del producto
            const nombreServicio = document.createElement('p');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');
            //Generar el precio del producto
            const precioServicio = document.createElement('p');
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add('precio-servicio');
            //Generar el div contenedor del servicio
            const divServicio = document.createElement('div');
            divServicio.classList.add('servicio');
            divServicio.dataset.idServicio = id;
            //Selecciona un servicio para la cita
            divServicio.onclick = seleccionarServicio;
            //Inyectar precio y nombre al div servicio
            divServicio.appendChild(nombreServicio);
            divServicio.appendChild(precioServicio); //.
            //Inyectarlo en el HTML
            document.querySelector('#servicios').appendChild(divServicio);
        });
    }catch(error){
        console.log(error);
    }
}
function seleccionarServicio(e){
    let Elemento;
    if(e.target.tagName === 'P'){
        Elemento = e.target.parentElement;
    }
    else{
        Elemento = e.target;
    }

    if(Elemento.classList.contains('seleccionado')){
        Elemento.classList.remove('seleccionado');
    }else{
        Elemento.classList.add('seleccionado');
    }
}

function paginaSiguiente(){
    const Siguiente = document.querySelector('#siguiente');
    Siguiente.addEventListener('click', (e) =>{
        e.preventDefault();
        Pagina++;
        botonPaginador();
    });
}

function paginaAnterior(){
    const Anterior = document.querySelector('#anterior');
    Anterior.addEventListener('click', (e) =>{
        e.preventDefault();
        Pagina--; 
        botonPaginador();
    });
}

function botonPaginador(){
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');
    if(Pagina === 1){
        paginaAnterior.classList.add('ocultar');
    }
    else if(Pagina === 3){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
    }
    else{
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion(); //Cambia la sección que se muestra por la de la pagina
}
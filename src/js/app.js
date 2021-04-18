document.addEventListener('DOMContentLoaded', () =>{
    IniciarApp();
});

function IniciarApp(){
    mostrarServicios();
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
            //Inyectar precio y nombre al div servicio
            divServicio.appendChild(nombreServicio);
            divServicio.appendChild(precioServicio);
            console.log(divServicio);
        });
    }catch(error){
        console.log(error);
    }
    
}
//inicializar el constructor de Muuri

const grid = new Muuri(".grid", {
    layout: {
      rounding: false,
    },
  });


window.addEventListener("load",() => {
    grid.refreshItems().layout()
    document.getElementById("grid").classList.add("imagenes-cargadas")
    
    //agregamos los listener de los enlaces para filtrar por categoria. Acceder a todos los enlaces que se encuentren dentro de categorias
    const enlaces = document.querySelectorAll("#categorias a");
    enlaces.forEach((elemento) => {
        elemento.addEventListener("click",(evento) => {
            evento.preventDefault() //no coloca el gato en la url
            enlaces.forEach((enlace)=>enlace.classList.remove("activo") )
            //omitir llaves si es una linea de codigo
            evento.target.classList.add("activo")

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === "todos" ? grid.filter(`[data-categoria]`) : grid.filter(`[data-categoria="${categoria}"]`)
            



        })
    })

    //alt+96

//Agregamos el listener para la barra de codigo


document.querySelector("#barra-busqueda").addEventListener("input", (evento) => {
    const busqueda = evento.target.value;
    grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda) )  
} )

    //agregamos listener para miagnes
    const overlay=document.getElementById("overlay");
    document.querySelectorAll(".grid .item img").forEach((elemento) =>{
    

        //eventlister hace que se ejecute una accion al hacer click
        elemento.addEventListener("click",() => {
            const ruta=elemento.getAttribute("src");
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            
            overlay.classList.add("activo");
            document.querySelector("#overlay img").src = ruta;
            document.querySelector("#overlay .descripcion").innerHTML = descripcion;
        })
    })

    //eventlistener boton cerrar
    document.querySelector("#btn-cerrar-popup").addEventListener("click",() => {
        overlay.classList.remove("activo")
    })

  //eventlisener del overlay
  overlay.addEventListener("click",(evento) => {
      evento.target.id === "overlay" ? overlay.classList.remove("activo") : "";
  })

})








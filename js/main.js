
//Creando variables para incorporar al html desde el array Datos
const container = document.getElementById('container');

for (const dato of DATOS) {
    container.innerHTML += `<div class="image">           
                            <img src=${dato.img} class="imagenCurso">
                            <div class="subImage">                        
                            <h3>${dato.nombre} </h3>
                            <h3>${dato.precio} </h3>
                            <p>${dato.descripcion}</p>
                            <a class="add-cart cart${dato.id}" href="#"> Agregar a carrito </a> 
                                                                            </div></div>`
}

//container.appendChild(DATOS);

//seleccionar elementos del carrito
let carts = document.querySelectorAll('.add-cart')

/*let products = [
    {
        nombre: Constela
    }
] 
*/
for (let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(DATOS[i]);
        totalCost(DATOS[i]);
    });
};

function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

//creando funcion para almacenar en local storage

function cartNumbers(DATOS) {
    console.log(DATOS.nombre +" $"+ DATOS.precio)
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if ( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers +  1 ;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(DATOS);
    
}
function setItems(DATOS){ 
    
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if(cartItems[DATOS.nombre] == undefined) {
            cartItems = {
            ...cartItems,
            [DATOS.nombre]: DATOS
            }
        }
        cartItems[DATOS.nombre].inCart += 1;
    } else {
        DATOS.inCart = 1;
        cartItems = {
            [DATOS.id]: DATOS
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems)); 
}

function totalCost (DATOS) {
    let cartCost = localStorage.getItem('totalCost');
    
    console.log(totalCost)
    

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + DATOS.precio)
    } else {
        localStorage.setItem("totalCost", DATOS.precio); 
    }
}

onloadCartNumbers();
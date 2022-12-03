const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "steak dinner",
    category: "dinner",
    price: 39.99,
    img: "./images/item-10.jpeg",
    desc: `Un buen filetazo pa rechuparse los dedos. De rechupete. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

// capturamos el DIV principal que contiene las fotos, la descripción, el nombre
// y el precio de los platillos
const sectionCenter = document.querySelector(".section-center");

// vamos a capturar el contenedor DIV de los botones porque ahí vamos a poner los botones
// creados de forma dinámica con JS
const container =document.querySelector(".btn-container");






//  Probé poniéndola al final y tmb funcionó

// función que hará que se renderice la página al abrirla
window.addEventListener("DOMContentLoaded", function () {
  //llamando a la funciôn que va a rellenar dinâmicamente la pâgina
  // a mi funciôn le voy a pasar el array MENU
  displayMenuItems(menu);
  displayMenuButtons();

});








function displayMenuItems(menuItems) {
  // convirtiendo el array llamado Menu (arriba) en un mapa, que fue pasado en la funcion
  // anterior. En esta funcion el elemento que se le pasa es menuItems, pero como estâ
  // conectada a la anterior, pues es lo mismo que el array MENU.
  let displayMenu = menuItems.map(function (item) {
    // copiamos la sección del html que queremos multiplicar. A cada ITEM (elemento del array)
    // le vamos a crear una sección como esta que está abajo
    return `<article class="menu-item">
              <img src=${item.img} alt=${item.title} class="photo">
              <div class="item-info">
                <header>
                  <h4>${item.title}</h4>
                  <h4 class="price">$${item.price}</h4>
                </header>
                <p class="item-text">${item.desc}</p>
              </div>
            </article>`;
  });

  // Para unir todas las secciones creadas en un texto tipo prosa, sin que hayan comas separando
  // los elementos del mapa
  displayMenu = displayMenu.join("");

  // Ahora vamos a colocar todo lo que creamos anteriormente en el DIV contenedor principal
  sectionCenter.innerHTML = displayMenu;

  // Esto es para ver lo que estamos haciendo en la consola del explorador
  console.log(displayMenu);
}


function displayMenuButtons() {

  // vamos a crear un nuevo array (con reduce) sacado del array principal MENU
  // este array va a extraer las categorîas ûnicas de los elementos del array MENU
  // accumulator = values;         current = items;    en este caso
  const categories = menu.reduce(function(accumulator, current) {
    if (!accumulator.includes(current.category)) {
      accumulator.push(current.category);
    }
    return accumulator;
  }, ["all"]);
  
  const categoryBtns = categories.map(function(category) {
    return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`
  }).join("");
  
  // para mostrar finalmente los botones en la pâgina
  container.innerHTML = categoryBtns;
  
  //ahora vamos a capturar los botones en un array
  const filterBtns = document.querySelectorAll(".filter-btn");
  

  // filter items. Al array de botones le vamos a aplicar un foreach, en donde a cada elemento
  // o a cada botôn se le agregue un event listener
  filterBtns.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      const category = event.currentTarget.dataset.id;

      // vamos a crear una copia del array principal llamado MENU con el método filter donde
      // vamos a filtrar los elementos que tengan la misma categoría (dentro de sus propiedades)
      // que la del botón que sea clicado
      // menuItem es cada elemento del array
      const menuCategory = menu.filter(function(menuItem) {
        // si la propiedad llamada categoría de cada elemento del array, coincide con la cateogría
        // que se le asignó a cada botón a través de data-id="breakfast" (por ejemplo)
        // entonces regrésame ese/esos item.
        if (menuItem.category === category) {
          return menuItem;
        }
      });

      // ********* Como los elementos del array original, MENU, no tienen la propiedad de
      // category: all, entonces tenemos que crear un if statement para cuando el usuario
      // haga clic sobre el botón ALL.
      // Si la categoría del botón (data-id="all") es igual a "all", entonces MUESTRA 
      // (displayMenuItems) el array ORIGINAL, es decir, MENU. Si no es igual, entonces MUESTRA
      // (displayMenuItems) el array nuevo filtrado en el paso anterior (menuCategory)
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });

};
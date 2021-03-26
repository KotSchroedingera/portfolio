// переключение активного пункта в меню 

let menuItems = document.querySelectorAll('.menu .items .item'); // Возвращает список элементов
let lastClickedMenuItem = menuItems[0]; // Первый элемент из списка (счет начинается с нуля)

for( let i = 0; i < menuItems.length; i++ ){
  // Цикл берет и кругами выполняет код. На каждом круге, i является конкретным числом.
  // Добавляется событие 'клик' на menuItems[0], потом menuItems[1], menuItems[2]...
  menuItems[i].addEventListener('click', function(){
    lastClickedMenuItem.classList.remove('active');
    this.classList.add('active');
    // Убрали класс с предыдущего кликнутого элемента, добавили на текущий
    
    lastClickedMenuItem = this; 
    // Обновили значение переменной - теперь она ссылается на текущий элемент. 
    // Чтобы на следующем клике, убрать класс уже с этого.
  });
}

// переключение класса active у аудио

let audioItems = document.querySelectorAll('.audio .lesson'); // Возвращает список элементов
let lastClickedaudioItem = audioItems[1]; // Первый элемент из списка (счет начинается с нуля)

for( let i = 0; i < audioItems.length; i++ ){
  // Цикл берет и кругами выполняет код. На каждом круге, i является конкретным числом.
  // Добавляется событие 'клик' на menuItems[0], потом menuItems[1], menuItems[2]...
  audioItems[i].addEventListener('click', function(){
    lastClickedaudioItem.classList.remove('active');
    this.classList.add('active');
    // Убрали класс с предыдущего кликнутого элемента, добавили на текущий
    
    lastClickedaudioItem = this; 
    // Обновили значение переменной - теперь она ссылается на текущий элемент. 
    // Чтобы на следующем клике, убрать класс уже с этого.
  });
}
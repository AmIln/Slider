let BodySlider = document.querySelector('.Promotions');
let Sliders = document.querySelectorAll('.Slide');
let QuantitySliders = Sliders.length - 1;
let DescriptionText = document.querySelectorAll('.DescriptionText');
let Button = document.querySelectorAll('.Button_slide');
let NumberPercent = document.querySelectorAll('.NumberPercent')

let slide_wrapper = document.querySelector('.Slide-Wrapper');
let slide_wrapper_px = slide_wrapper.clientWidth

let slide = document.querySelector('.Slide');
let slide_px = slide.clientWidth + 40;
let slideMAX = document.querySelector('.Slide_active');
let slideMAX_px = slideMAX.clientWidth + 50;
let wrapper = document.querySelector('.Promotions-Carousel');
let wrapper_px = wrapper.clientWidth;

// создание точек
function addDoted(num) {
    let CircleWrapper = document.createElement('div');
    CircleWrapper.className = 'CircleWrapper';
    BodySlider.append(CircleWrapper)
    for (let i=0;i<=num;i++) {
        let Dotted = document.createElement('div');
        Dotted.className = 'Circle';
        document.querySelector('.CircleWrapper').append(Dotted);

    }
}
addDoted(QuantitySliders)


// функция подсчета 3х слайдов
function tripleSlides() {
  let sum_px = (slide_px*2) + slideMAX_px;
  let position = (sum_px - wrapper_px) / 2;

  //теперь position глобальная переменная!!!!
  window.position = position
  //теперь sum_px глобальная переменная!!!!
  window.sum_px = sum_px;
  slide_wrapper.style.transform = 'translate(-'+position+'px, 0px)';
}
tripleSlides()
window.addEventListener('resize',function(){
  wrapper_px = innerWidth;
  tripleSlides()
});


// переделываем нод лист в массив
let slide_list = document.querySelectorAll('.Slide');
let slide_arr = Array.prototype.slice.call(slide_list);

// обертка точек
let CircleWrapper = document.querySelector('.CircleWrapper');
// переделываем нод лист в массив
let dotted_list = document.querySelectorAll('.Circle');
let dotted_arr = Array.prototype.slice.call(dotted_list);




//определяет нужную точку
function dotted_detected() {
  for (let i=0;i<=slide_arr.length-1;i++) {
    if (slide_arr[i].classList.contains('Slide_active')) {
      dotted_active(i)
    }
  }
}

//добавление класса актив
function dotted_active(num) {
  dotted_arr[num].classList.add('Circle_active')
}
dotted_detected()



// обработчик событий
CircleWrapper.addEventListener('click', function(e) {
  let target = e.target;
  if (target.className != 'CircleWrapper') {
    let target_index = dotted_arr.indexOf(target)
    select_active(target_index)
  }
})

function select_active(target_index) {

  //удаление активных классов
  for (let i=0;i<=slide_arr.length-1;i++) {
    slide_arr[i].classList.remove('Slide_active')
    dotted_arr[i].classList.remove('Circle_active')
    if (DescriptionText[i].classList.contains('DescriptionText_promo_max')) {
      DescriptionText[i].classList.remove('DescriptionText_promo_max', 'DescriptionText_size_s', 'fontsize_35')
      DescriptionText[i].classList.add('DescriptionText_promo_min', 'DescriptionText_size_xxs', 'fontsize_25')
      Button[i].classList.remove('Button_size_s', 'fontsize_18');
      Button[i].classList.add('Button_size_xxs', 'fontsize_13');
      NumberPercent[i].classList.remove('NumberPercent_big')
    }
  }

  //добавление активных классов
  slide_arr[target_index].classList.add('Slide_active');
  dotted_arr[target_index].classList.add('Circle_active');
  DescriptionText[target_index].classList.add('DescriptionText_promo_max', 'DescriptionText_size_s', 'fontsize_35');
  Button[target_index].classList.add('Button_size_s', 'fontsize_18');
  NumberPercent[target_index].classList.add('NumberPercent_big')

  //смена позиции в соответствии с target_index
  if (target_index < 1) {
    let new_position = (wrapper_px/2) - (slideMAX_px/2) ;
    slide_wrapper.style.transform = 'translate('+new_position+'px, 0px)';
  } if (target_index === 1) {
    slide_wrapper.style.transform = 'translate(-'+position+'px, 0px)';
  } if (target_index > 1) {
    let new_position = ((slide_px*target_index) - (slideMAX_px/2));
    slide_wrapper.style.transform = 'translate(-'+new_position+'px, 0px)';
  }
}


//функция автослайдера
function select_active_time() {
  let active_index;
  for (let i=0;i<=Sliders.length-1;i++) {
    if (Sliders[i].classList.contains('Slide_active')) {
      active_index = i+1;
    }
  }
  if (active_index > Sliders.length-1) {
    active_index = 0;
  }
  select_active(active_index)
}

//запуск автослайдера с задержкой
setInterval(() => {
  select_active_time()
}, 5000);


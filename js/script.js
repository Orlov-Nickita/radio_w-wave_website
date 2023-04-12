if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
  alert('Hello\nSafari does not enable tab highlighting by default. To turn it on:\n1. Go to Preferences\n2. Select the Advanced tab\n3. Check "Press Tab to highlight each item on a webpage"')
}

let onfocus1 = document.querySelector('.header__burger');

function focusfunc(element) {
  element.addEventListener('focus', (event) => {
    event.target.style.outline = '1px solid var(--color-6d31ee)';
  });

  element.addEventListener('blur', (event) => {
    event.target.style.outline = '1px solid transparent';
  });
};

focusfunc(onfocus1);

// Кастомные функции

function hidden_extra_podcasts(array, shown_items, req_class) {
  // Функция для скрытия элементов из общего количества в зависимости от ширины экрана, на котором открывается сайт
  array.forEach(function (item, index) {
    if (index <= (shown_items - 1)) {
      if (item.classList.contains(req_class)) {
        return item.classList.remove(req_class)
      }
    }
    else {
      return item.classList.add(req_class)
    };
  });
};

function last_of_visible(array, req_class) {
  // Функция для определения последнего элемента из числа показанных и с учетом скрытых
  let new_list = [];
  for (item of array.entries()) {
    if (!(item[1].classList.contains(req_class))) {
      new_list.push(item)
    }
  }
  return last_visible_elem = new_list.pop()[1]
};

function keyboard_btn_press(button) {
  // Функция для обеспечения доступности с клавиатуры элементам разметки, которые изначально не предполагают доступ с клавиатуры, либо для кастомных элементов
  if (button.code === 'Space' || button.code === 'Enter') {
    button.preventDefault();
    if (button.currentTarget.dataset.role === 'playlists-genre') {
      document.getElementById(button.currentTarget.htmlFor).checked = true
      document.activeElement.click()
    }
    if (button.currentTarget.dataset.role === 'user_agreement_check') {
      var checkbox = document.getElementById(button.currentTarget.htmlFor)
      if (checkbox.checked === true) {
        checkbox.checked = false
      }
      else {
        checkbox.checked = true
      }
    }
    if (button.currentTarget.dataset.role === 'playbtn_group_in_playlists_section') {
      let group = document.querySelectorAll('.groups__item')
      let groups_photo = button.currentTarget.children[0];
      let groups_photo_darkening = groups_photo.children[1];
      let groups_item_playbtn = groups_photo.children[2];
      let groups_item_pausebtn = groups_photo.children[3];
      let groups__info = button.currentTarget.children[1];
      let groups__title = groups__info.children[0];
      let groups__descr = groups__info.children[1];

      if (button.type === 'keydown') {
        groups_photo_darkening.classList.add('groups__photo-darkening--active');
        if (button.currentTarget.classList.contains('groups__item--playing')) {
          groups_item_pausebtn.classList.add('groups__item-pausebtn--active')
        }
        else {
          groups_item_playbtn.classList.add('groups__item-playbtn--active');
        }
        groups__info.classList.add('groups__info--active');
        groups__title.classList.add('groups__title--active');
        groups__descr.classList.add('groups__descr--active');
      }

      if (button.type === 'keyup') {
        groups_photo_darkening.classList.remove('groups__photo-darkening--active');
        if (button.currentTarget.classList.contains('groups__item--playing')) {
          groups_item_pausebtn.classList.remove('groups__item-pausebtn--active')
        }
        else {
          groups_item_playbtn.classList.remove('groups__item-playbtn--active');
        }
        groups__info.classList.remove('groups__info--active');
        groups__title.classList.remove('groups__title--active');
        groups__descr.classList.remove('groups__descr--active');

        group.forEach(function (other_item) {
          if (other_item != button.currentTarget) {
            other_item.classList.remove('groups__item--playing')
          }
        })
        button.currentTarget.classList.toggle('groups__item--playing')
      }
    }
  }
};

function setHeight(class_item) {
  // Функция для адаптации высоты textarea в форме
  document.getElementById(class_item).style.height = document.getElementById(class_item).scrollHeight + 'px';
}

// burger

let burger = document.querySelector('.burger');
let menu = document.querySelector('.nav__nav');
let test = document.querySelector('.nav__list');
let menuLinks = menu.querySelectorAll('.nav__link');

burger.addEventListener('click',
  function () {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('nav__nav--active');
    document.body.classList.toggle('stop-scroll');
  });

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('burger--active');
    menu.classList.remove('nav__nav--active');
    document.body.classList.remove('stop-scroll');
  });
});

// Кастомный Select

let element = document.querySelector('.authors__select');
let choices = new Choices(element, {
  shouldSort: false,
  searchEnabled: false,
  itemSelectText: '',
});
document.querySelector(".choices").setAttribute('aria-label', 'Раскрывающийся список с авторами передач для выбора')

window.onkeydown = function (choiceSelect) {
  if (choiceSelect.keyCode == 32 && choiceSelect.target == document.querySelector('div.choices.is-focused')) {
    choiceSelect.preventDefault()
    return false
  }
}

// Скрытие лишних (по макету) элементов секции Подкасты и определение у последнего видимого элемента отступа margin в 0px

let allpodcastsItem = document.querySelectorAll('.podcasts__item');

if (screen.width < 576) {
  var visibleItems = 4;
}
if (screen.width >= 576) {
  var visibleItems = 8;
}

hidden_extra_podcasts(allpodcastsItem, visibleItems, 'podcasts__item--hidden');
last_of_visible(allpodcastsItem, 'podcasts__item--hidden').style.marginBottom = '0'

// Аккордеон

new Accordion('.accordeon__list', {
  elementClass: 'accordeon__persons',
  triggerClass: 'accordeon__control',
  panelClass: 'accordeon__menu',
  activeClass: 'accordeon--active'
});

let acc_item = document.querySelectorAll('.accordeon__persons');
let acc_title = document.querySelectorAll('.accordeon__title');
let plus = document.querySelectorAll('.accordeon__plus');

acc_title.forEach(function (element) {

  element.addEventListener('click', function (elem) {
    let title = elem.currentTarget.dataset.title;

    plus.forEach(function (element) { element.classList.remove('accordeon__plus--active') });

    acc_item.forEach(function (btn) {

      if (btn.classList.contains('accordeon--active')) {
        document.querySelector(`[data-plus="${title}"]`).classList.add('accordeon__plus--active');
      };
    });
  });
});

// Табы для карточек гостей в секции Гости

let tabsBtn = document.querySelectorAll('.menu__link');
let tabsItem = document.querySelectorAll('.persons');

tabsBtn.forEach(function (element) {
  if (element.parentNode.classList.contains('menu__item-acc')) {
    element.addEventListener('click', function (el) {
      let path = el.currentTarget.dataset.path;
      let tab = document.querySelector(`[data-target="${path}"]`)

      if (tab.classList.contains('persons--active')) {
        tab.classList.remove('persons--active');
        element.classList.remove('menu__link--active')
      }

      else {
        tabsItem.forEach(function (btn) {
          btn.classList.remove('persons--active');
        });
        tabsBtn.forEach(function (link) {
          link.classList.remove('menu__link--active');
        })

        tab.classList.add('persons--active');
        element.classList.add('menu__link--active')
        if (screen.width < 576) {
          tab.scrollIntoView({ behavior: "smooth" });
        }
      };
    });
  }
});

// Функционал радио кнопок

let radio = document.getElementsByName('genre');
let genre = document.querySelectorAll(".groups");

radio.forEach(function (radio_btn) {
  radio_btn.addEventListener('click', function (elem) {
    let radio_genre = radio_btn.value;
    let playlist = document.querySelector(`[data-genre="${radio_genre}"]`);

    genre.forEach(function (list) {
      list.classList.remove('groups--active');
    });
    playlist.classList.add("groups--active");
  });
});

// Слайдер - swiper

let swiper = new Swiper('.swiper', {

  breakpoints: {
    320: {
      slidesPerView: 2.3,
      spaceBetween: 19.5
    },

    462: {
      slidesPerView: 2,
      spaceBetween: 30
    },

    1310: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  },

  navigation: {
    nextEl: '.swiper-next-btn',
    prevEl: '.swiper-prev-btn',
  },

  a11y: {
    prevSlideMessage: 'Нажать, чтобы промотать назад',
    nextSlideMessage: 'Нажать, чтобы промотать вперед',
  },

});

// Функционал запуска проигрывания плейлиста в секции Плейлисты

let group = document.querySelectorAll('.groups__item')

group.forEach(function (gr_elem) {
  gr_elem.addEventListener('click', function () {
    group.forEach(function (other_item) {
      if (other_item != gr_elem) {
        other_item.classList.remove('groups__item--playing')
      }
    })
    gr_elem.classList.toggle('groups__item--playing')
  })
})

// Функционал работы кнопок включения радио в шапке сайта

let radio_btns = document.querySelectorAll('.radio__btn');
radio_btns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    radio_btns.forEach((i_btn) => {
      if (i_btn != this) {
        i_btn.classList.remove('radio--playing')
      }
      else {
        this.classList.toggle('radio--playing')
      }
    });
  });
});

// Функционал кнопки "Поиск"

let loupe = document.querySelector('.search__btn');
let search_form = document.querySelector('.search__form');


loupe.addEventListener('click', function () {
  search_form.classList.toggle('search__form--active');
});

// Функционал кнопки "Что в эфире?"

let what_in_efir = document.querySelector('.header__ether');
let header_radio_after = document.querySelector('.header__radio');

what_in_efir.addEventListener('click', () => {
  what_in_efir.classList.toggle('header__ether--active')
  header_radio_after.classList.toggle('header__radio--active')
})

// Функционал работы кнопок включения подкаста

let podcasts_pp_btn = document.querySelectorAll('.podcasts__play-pause-btn');

podcasts_pp_btn.forEach(function (btn) {

  btn.addEventListener('click', function () {

    allpodcastsItem.forEach((pod_item) => {
      if (!(pod_item.contains(this))) {
        pod_item.classList.remove("podcasts--playing")
      }
    });

    if (btn.parentNode.parentNode.parentNode.classList.contains('podcasts--playing')) {
      btn.parentNode.parentNode.parentNode.classList.remove('podcasts--playing')
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        qty_played = btn.parentNode.parentNode.parentNode.querySelector(".activity__played")
      }
      else {
        qty_played = document.activeElement.parentNode.parentNode.querySelector(".activity__played")
      }

      qty_played.textContent = Number(qty_played.textContent) + 1
      aria_qty_played = qty_played.attributes['aria-label'].textContent.slice(0, 25) + qty_played.textContent;
      qty_played.setAttribute('aria-label', aria_qty_played)
    }

    else {
      btn.parentNode.parentNode.parentNode.classList.add('podcasts--playing')
    }

  });
});

// Кнопка "Показать еще" в секции подкасты

let BtnMore = document.querySelector('.podcasts__btn');
const showMore = 2;

BtnMore.addEventListener('click', () => {
  let count = 0;
  if (document.querySelector('.podcasts__item--hidden')) {
    last_of_visible(allpodcastsItem, 'podcasts__item--hidden').style.marginBottom = '30px'

    for (item of allpodcastsItem.entries()) {
      if (count < showMore) {
        if (item[1].classList.contains('podcasts__item--hidden')) {
          count += 1;
          item[1].classList.remove('podcasts__item--hidden');
        };
      }

      else {
        last_of_visible(allpodcastsItem, 'podcasts__item--hidden').style.marginBottom = '0'
        break
      };
    };
  }
  else {
    BtnMore.closest('.btn-container').style.opacity = '0.3'
  };
});

// Функционал валидации формы

new JustValidate('.form', {
  rules: {
    text: {
      required: true,
      minLength: 5,
      maxLength: 50
    },
    name: {
      required: true,
      minLength: 2,
      maxLength: 30
    },
    mail: {
      required: true,
      email: true
    },
    agreement_check: {
      required: true,
    },
    login: {
      required: true,
    },
    password: {
      required: true,
      password: true,
      minLength: 8,
    }

  },
  messages: {
    text: {
      required: 'Вы не ввели сообщение',
      minLength: 'Минимальная длина 5 букв',
      maxLength: 'Максимальная длина 50 букв'
    },
    name: {
      required: 'Вы не ввели имя',
      minLength: 'Минимальная длина 2 буквы',
      maxLength: 'Максимальная длина 30 букв'
    },
    mail: {
      required: 'Вы не ввели e-mail',
      email: 'Введите корректный адрес e-mail по образцу test@test.test'
    },
    agreement_check: {
      required: 'Необходимо принять согласие на обработку данных',
    },
    login: {
      required: 'Необходимо ввести логин',
    },
    password: {
      required: 'Необходимо ввести пароль',
      password: 'Пароль должен содержать хотя бы одну букву и одну цифру',
      strength: 'Пароль должен содержать по крайней мере одну заглавную букву, одну строчную букву и одну цифру',
      minLength: 'Минимальная длина 8 символов'
    }

  },
  submitHandler: function (form, values, ajax) {
    alert("Форма валидна, все хорошо!");
  },
});

// Модальное окно для входа в личный кабинет


let acc_btn = document.querySelectorAll(".header__accountbtn");
let modal_window = document.querySelector('.account');

acc_btn.forEach(function (btn) {
  btn.addEventListener('click', () => {
    modal_window.classList.add('account--active');
    document.body.classList.add('stop-scroll');
  })
});

modal_window.addEventListener('click', (e) => {
  if (e.target.classList.contains('account__close') ||
    e.target.closest('.account__close') ||
    e.target.classList.contains('account__wrapper')) {

    modal_window.classList.remove('account--active');
    document.body.classList.remove('stop-scroll');
  }
})

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modal_window.classList.contains('account--active')) {
    modal_window.classList.remove('account--active');
    document.body.classList.remove('stop-scroll');
  }
})

console.log("✅ script.js подключен!");
// Функция для безопасного добавления обработчиков событий
function addEvent(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    } else {
        console.error(`❌ Элемент не найден: ${event}`);
    }
}

// Ожидание загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".header__auth-button");

    // Проверка наличия кнопки входа
    if (loginButton) {
        addEvent(loginButton, "click", () => {
            console.log("🔑 Нажата кнопка 'Войти'");
            alert("Функция входа пока не реализована!");
        });
    } else {
        console.warn("⚠️ Кнопка входа не найдена!");
    }

    // Получаем заголовки товаров и формируем массив
    const productTitles = Array.from(document.querySelectorAll(".product__title")).map(title => title.textContent);

    // Выводим заголовки товаров в отдельный блок
    const titleListContainer = document.querySelector(".title-list");
    if (titleListContainer) {
        productTitles.forEach(title => {
            const listItem = document.createElement("li");
            listItem.textContent = title;
            titleListContainer.appendChild(listItem);
        });
        console.log("✅ Заголовки товаров добавлены в список!");
    } else {
        console.warn("⚠️ Контейнер для списка заголовков не найден!");
    }

    // Проверка наличия всплывающей формы
    const modal = document.querySelector(".modal");
    const openModalButton = document.querySelector(".open-modal");
    const closeModalButton = document.querySelector(".modal__close");

    if (modal && openModalButton && closeModalButton) {
        addEvent(openModalButton, "click", () => {
            modal.classList.add("active");
            console.log("📌 Открыта всплывающая форма");
        });

        addEvent(closeModalButton, "click", () => {
            modal.classList.remove("active");
            console.log("📌 Закрыта всплывающая форма");
        });

        addEvent(window, "click", (event) => {
            if (event.target === modal) {
                modal.classList.remove("active");
                console.log("📌 Закрытие формы при клике вне окна");
            }
        });
    } else {
        console.warn("⚠️ Всплывающая форма не найдена! Добавляем кнопку 'Наверх'");

        const scrollToTopButton = document.createElement("button");
        scrollToTopButton.textContent = "⬆ Наверх";
        scrollToTopButton.classList.add("scroll-to-top");
        document.body.appendChild(scrollToTopButton);

        addEvent(scrollToTopButton, "click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            console.log("📌 Скролл вверх страницы");
        });

        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add("visible");
            } else {
                scrollToTopButton.classList.remove("visible");
            }
        });
    }
});

// Обработчик появления секции "Новинки"
const productsSection = document.querySelector(".products");

function checkVisibility() {
    if (!productsSection) {
        console.error("❌ Секция .products не найдена!");
        return;
    }

    const sectionRect = productsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (sectionRect.top < windowHeight * 0.9) {
        console.log("✅ Секция 'Новинки' стала видимой!");
        productsSection.classList.add("visible", "fade-in");
        window.removeEventListener("scroll", checkVisibility);
    }
}

// Добавляем обработчик скролла
addEvent(window, "scroll", checkVisibility);
console.log("📌 Слушатель скролла установлен!");
const productsData = [
    {
      id: 1,
      image: "images/kisspng-cider-doughnut-donuts-frosting-icing-muffin-5b47f4ceec1ab7.3977501415314423829671.png",
      title: "Пончик «Тропический рай»",
      description: "Пончики с начинкой из манго и маракуйи, покрытые кокосовой глазурью.",
      taste: "Сладость с легкой кислинкой, напоминающей отдых на пляже."
    },
    {
      id: 2,
      image: "images/pngtree-matcha-green-tea-donut-png-image_9201292.png",
      title: "Пончик «Матча и Юдзу»",
      description: "Пончики с японским цитрусом юдзу и глазурью из зеленого чая матча.",
      taste: "Легкая горчинка матча в сочетании с цитрусовой кислинкой."
    },
    {
      id: 3,
      image: "images/189bc91c45f73abe5f4298d36de52e5c.png",
      title: "Пончик «Соленая карамель и бекон»",
      description: "Пончики с карамельной начинкой и хрустящими кусочками бекона.",
      taste: "Идеальное сочетание сладкого и соленого."
    }
  ];
  const productsList = document.querySelector('.products__list');

  // Очищаем контейнер перед выводом
  productsList.innerHTML = '';
  
  // Динамически создаем карточки
  for (const key in productsData) {
    const product = productsData[key];
    const productCard = `
      <div class="product-card" data-id="${product.id}">
        <img class="product-card__image" src="${product.image}" alt="${product.title}">
        <h3 class="product-card__title">${product.title}</h3>
        <p class="product-card__description">${product.description}</p>
        <p class="product-card__taste"><strong>Вкус:</strong> ${product.taste}</p>
      </div>
    `;
    productsList.insertAdjacentHTML('beforeend', productCard);
  }
// Прелоадер
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const mainContent = document.querySelector('.main');
    
    // Показываем прелоадер
    preloader.style.display = 'flex';
    
    // Имитация загрузки (3 секунды)
    setTimeout(function() {
      // Загружаем данные товаров
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          renderProducts(data.products);
          preloader.style.opacity = '0';
          
          setTimeout(() => {
            preloader.style.display = 'none';
            mainContent.style.display = 'block';
          }, 500);
        })
        .catch(error => {
          console.error('Ошибка загрузки данных:', error);
          preloader.style.display = 'none';
          mainContent.style.display = 'block';
        });
    }, 3000);
  });
  
  // Функция рендеринга товаров
  function renderProducts(products) {
    const productsList = document.querySelector('.products__list');
    
    if (!productsList) return;
    
    productsList.innerHTML = '';
    
    products.forEach(product => {
      const productCard = `
        <div class="product-card" data-id="${product.id}">
          <img class="product-card__image" src="${product.image}" alt="${product.title}" loading="lazy">
          <h3 class="product-card__title">${product.title}</h3>
          <p class="product-card__description">${product.description}</p>
          <p class="product-card__taste"><strong>Вкус:</strong> ${product.taste}</p>
        </div>
      `;
      productsList.insertAdjacentHTML('beforeend', productCard);
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.products__list');
    const cards = Array.from(document.querySelectorAll('.product-card'));
    const prevBtn = document.querySelector('.carousel__button--prev');
    const nextBtn = document.querySelector('.carousel__button--next');
    const dotsContainer = document.querySelector('.carousel__dots');
    
    let currentIndex = 0;
    let isAnimating = false;
    const animationDuration = 600; // Должно совпадать с CSS transition
    
    // Создаем точки-индикаторы
    cards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('carousel__dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        if (!isAnimating && index !== currentIndex) {
          goToSlide(index);
        }
      });
      dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.carousel__dot');
    
    // Инициализация
    updateCarousel();
    
    function updateCarousel() {
      cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        
        if (index === currentIndex) {
          card.classList.add('active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
          card.classList.add('prev');
        } else if (index === (currentIndex + 1) % cards.length) {
          card.classList.add('next');
        }
      });
      
      // Обновляем активную точку
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    function goToSlide(index) {
      if (isAnimating) return;
      
      isAnimating = true;
      currentIndex = (index + cards.length) % cards.length;
      updateCarousel();
      
      setTimeout(() => {
        isAnimating = false;
      }, animationDuration);
    }
    
    prevBtn.addEventListener('click', () => {
      if (!isAnimating) {
        goToSlide(currentIndex - 1);
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (!isAnimating) {
        goToSlide(currentIndex + 1);
      }
    });
    
    // Добавляем поддержку свайпов
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carousel.addEventListener('touchend', (e) => {
      if (isAnimating) return;
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        goToSlide(currentIndex + 1);
      } else if (touchEndX > touchStartX + threshold) {
        goToSlide(currentIndex - 1);
      }
    }
    
    // Клик по неактивным карточкам для перехода
    cards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        if (!card.classList.contains('active') && !isAnimating) {
          const direction = index > currentIndex ? 1 : -1;
          goToSlide(currentIndex + direction);
        }
      });
    });
  });
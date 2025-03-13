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
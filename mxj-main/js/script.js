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
        productsSection.classList.add("visible", "fade-in"); // Добавляем анимацию
        window.removeEventListener("scroll", checkVisibility); // Удаляем обработчик после появления
    }
}

// Добавляем обработчик скролла
addEvent(window, "scroll", checkVisibility);
console.log("📌 Слушатель скролла установлен!");
// 1️⃣ Проверяем подключение скрипта
console.log("✅ script.js подключен!");

// 2️⃣ Обработчик клика на кнопку "Войти"
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".header__auth-button");

    if (loginButton) {
        loginButton.addEventListener("click", () => {
            console.log("🔑 Нажата кнопка 'Войти'");
            alert("Функция входа пока не реализована!");
        });
    }
});
const productsSection = document.querySelector(".products");

// ✅ 2. Функция проверки видимости секции
function checkVisibility() {
    // Получаем размеры секции и высоту окна браузера
    const sectionRect = productsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Если верхняя граница секции меньше высоты окна — она видима
    if (sectionRect.top < windowHeight * 0.9) {
        console.log("🔽 Секция 'Новинки' стала видимой!");
        productsSection.classList.add("visible"); // Добавляем класс для анимации
        window.removeEventListener("scroll", checkVisibility); // Удаляем слушатель после появления
    }
}

// ✅ 3. Добавляем слушатель на `scroll`
window.addEventListener("scroll", checkVisibility);

// ✅ 4. Проверяем в консоли
console.log("🎯 Слушатель скролла установлен!");
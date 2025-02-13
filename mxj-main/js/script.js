console.log("✅ script.js подключен!");
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
function checkVisibility() {
    const sectionRect = productsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (sectionRect.top < windowHeight * 0.9) {
        console.log("🔽 Секция 'Новинки' стала видимой!");
        productsSection.classList.add("visible"); 
        window.removeEventListener("scroll", checkVisibility); 
    }
}
window.addEventListener("scroll", checkVisibility);
console.log("🎯 Слушатель скролла установлен!");
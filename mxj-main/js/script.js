document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton"); // Кнопка "Войти"
    const modalAuth = document.getElementById("modalAuth"); // Модальное окно входа
    const closeAuthButton = document.getElementById("closeAuthButton"); // Кнопка закрытия окна
  
    if (loginButton && modalAuth && closeAuthButton) {
      // Открытие окна входа
      loginButton.addEventListener("click", function () {
        modalAuth.classList.remove("hidden"); // Показываем модальное окно
      });
  
      // Закрытие окна входа
      closeAuthButton.addEventListener("click", function () {
        modalAuth.classList.add("hidden"); // Скрываем модальное окно
      });
  
      // Закрытие окна при клике вне его области
      window.addEventListener("click", function (event) {
        if (event.target === modalAuth) {
          modalAuth.classList.add("hidden");
        }
      });
    } else {
      console.error("Не найдены элементы модального окна входа!");
    }
  });
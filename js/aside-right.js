document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("block-4");
    const radios = document.querySelectorAll('input[type="radio"]');

    // Встановлення стилю контейнера згідно вибраної опції
    function updateStyle(selectedValue) {
        container.style.textTransform =
            selectedValue === "capitalize" ? "capitalize" : "initial";
    }

    // Обробка зміни кожної радіокнопки
    radios.forEach((radio) => {
        radio.addEventListener("change", function () {
            updateStyle(this.value);
            localStorage.setItem("selectedTransform", this.value);
        });
    });

    // Відновлення вибраного стилю
    const selectedTransform = localStorage.getItem("selectedTransform");
    if (selectedTransform) {
        radios.forEach((radio) => {
            if (radio.value === selectedTransform) {
                radio.checked = true;
                updateStyle(selectedTransform);
            }
        });
    }
});

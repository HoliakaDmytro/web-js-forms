document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("block-4");
    const radios = document.querySelectorAll('input[type="radio"]');
    let prevStyles = window.getComputedStyle(container);

    radios.forEach((radio) => {
        radio.addEventListener("change", function () {
            const selectedValue = this.value;

            if (selectedValue === "capitalize") {
                container.style.textTransform = "capitalize";
                localStorage.setItem("selectedTransform", "capitalize");
            } else if (selectedValue === "initialcase") {
                container.style.textTransform = "initial";
                localStorage.setItem("selectedTransform", "initialcase");
                container.style.cssText = prevStyles.cssText;
            }
        });
    });

    const selectedTransform = localStorage.getItem("selectedTransform");
    if (selectedTransform) {
        radios.forEach((radio) => {
            if (radio.value === selectedTransform) {
                radio.checked = true;
                if (selectedTransform === "capitalize") {
                    container.style.textTransform = "capitalize";
                } else {
                    container.style.textTransform = "initial";
                    container.style.cssText = prevStyles.cssText;
                }
            }
        });
    }
});

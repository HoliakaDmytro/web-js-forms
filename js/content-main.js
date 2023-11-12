// Функція для отримання значення cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Функція для встановлення cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/;";
}

// Функція для зберігання дільників у окремому cookie
function saveDivisors(number, divisors) {
    var timestamp = new Date().getTime();
    var cookieName = "divisors_" + timestamp;
    setCookie(cookieName, number + ":" + divisors, 7);
    setCookie("last_saved", cookieName, 7);
}

// Функція для отримання дільників числа
function getDivisors(n) {
    var divisors = [];
    var sqrtN = Math.sqrt(n);

    for (var i = 1; i <= sqrtN; i++) {
        if (n % i === 0) {
            divisors.push(i);

            if (i !== n / i) {
                divisors.push(n / i);
            }
        }
    }

    return divisors.sort((a, b) => a - b);
}

// Обробник події відправлення форми
document
    .getElementById("numberForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        var number = document.getElementById("number").value;
        var divisors = getDivisors(number).join(", ");
        alert("Divisors of a number " + number + ": " + divisors);
        saveDivisors(number, divisors);
    });

// Обробник події завантаження вікна
window.onload = function () {
    var lastSaved = getCookie("last_saved");
    if (lastSaved) {
        var savedStatus = getCookie(lastSaved + "_saved");
        if (!savedStatus) {
            document.getElementById("numberForm").style.display = "none";
            var divisors = getCookie(lastSaved);
            var keep = confirm(
                "Do you want to keep these divisors: " + divisors + "?"
            );
            if (keep) {
                setCookie(lastSaved + "_saved", "true", 7);
                alert("The data is saved in cookies. Please reload the page.");
            } else {
                setCookie(lastSaved, "", -1);
                setCookie("last_saved", "", -1);
                location.reload();
            }
        } else {
            document.getElementById("numberForm").style.display = "block";
        }
    } else {
        document.getElementById("numberForm").style.display = "block";
    }
};

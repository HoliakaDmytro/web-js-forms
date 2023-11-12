// Обробник натискання на «block-x»
document.getElementById("block-x").addEventListener("click", function () {
    if (!document.getElementById("image-url")) {
        const formHtml = `
            <div class="url-form">
                <div class="form-style">
                    <input type="text" id="image-url" class="input-field" placeholder="Enter URL">
                    <button id="add-image" class="submit-button">Add picture</button>
                </div>
            </div>
        `;
        document
            .getElementById("block-5")
            .insertAdjacentHTML("beforeend", formHtml);

        document
            .getElementById("add-image")
            .addEventListener("click", function () {
                const imageUrl = document.getElementById("image-url").value;
                if (imageUrl) {
                    const image = {
                        url: imageUrl,
                        id: Date.now(),
                    };
                    addImageToBlock(image);
                    saveImage(image);
                }
            });
    }
});

// Обробник натискання на кнопку в «block-4»
document.getElementById("block-4").addEventListener("click", function (event) {
    if (event.target.className === "remove-image") {
        const imageContainer = event.target.parentNode;
        const imageId = parseInt(imageContainer.dataset.imageId);
        removeImageFromBlock(imageContainer);
        removeImageFromStorage(imageId);
    }
});

// Обробник після повного заватаження сторінки
document.addEventListener("DOMContentLoaded", function () {
    const savedImages = JSON.parse(localStorage.getItem("images") || "[]");
    savedImages.forEach((image) => {
        addImageToBlock(image);
    });
});

function addImageToBlock(image) {
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    imageContainer.dataset.imageId = image.id;

    const img = document.createElement("img");
    img.src = image.url;
    img.alt = "New Image";
    img.onerror = function () {
        removeImageFromStorage(image.id);
        imageContainer.remove();
    };

    const removeButton = document.createElement("button");
    removeButton.className = "remove-image";
    removeButton.textContent = "Видалити";
    removeButton.onclick = function () {
        removeImageFromStorage(image.id);
        imageContainer.remove();
    };

    imageContainer.appendChild(img);
    imageContainer.appendChild(removeButton);

    document.getElementById("block-4").appendChild(imageContainer);
}

function saveImage(image) {
    const images = JSON.parse(localStorage.getItem("images") || "[]");
    images.push(image);
    localStorage.setItem("images", JSON.stringify(images));
}

function removeImageFromBlock(container) {
    container.remove();
}

function removeImageFromStorage(imageId) {
    let images = JSON.parse(localStorage.getItem("images") || "[]");
    images = images.filter((image) => image.id !== imageId);
    localStorage.setItem("images", JSON.stringify(images));
}

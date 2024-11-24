const API_KEY = prompt("Please enter your API key");

const getButtonElement = document.getElementById("generate-button");
const getInputElement = document.getElementById("userInput");
const getPElementByID = document.getElementById("answer");
const getMainContainer = document.querySelector(".main-container");
const getLoadingIndicator = document.getElementById("loading")

function showLoading() {
    getLoadingIndicator.classList.remove("hidden");
}

function hideLoading() {
    getLoadingIndicator.classList.add("hidden");
}

function fetchImageFromAPI() {
    const userInput = getInputElement.value;

    showLoading();

    fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            prompt: userInput,
            n: 1,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(imageData => {
            const imageUrl = imageData.data[0].url;
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.alt = userInput;
            imgElement.style.maxWidth = "100%";

            getMainContainer.appendChild(imgElement);
        })
        .catch(error => {
            console.error(error);
            getPElementByID.textContent = "Error generating image. Please try again or enter a different API key.";
        })
        .finally(() => {
            hideLoading()
        })}

getButtonElement.addEventListener("click", fetchImageFromAPI);

getInputElement.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        fetchImageFromAPI();
    }
});

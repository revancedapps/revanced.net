// Array of affiliate URLs
const affUrls = [
    "https://s.shopee.vn/8KXZSx7uvW",
    "https://s.shopee.vn/8UqzfG7HaZ",
    "https://s.shopee.vn/9zfnS11ZXs",
    "https://s.shopee.vn/A9zDeK0wCv",
    "https://s.shopee.vn/AKIdqd0Iry",
    "https://s.shopee.vn/AUc42vzfX1",
    "https://s.shopee.vn/9KQ6en46to",
    "https://s.shopee.vn/9UjWr63TYr",
    "https://s.shopee.vn/9f2x3P2qDu",
    "https://s.shopee.vn/9pMNFi2Csx",
    "https://s.shopee.vn/609egfGnfE",
    "https://s.shopee.vn/6AT4syGAKH",
    "https://s.shopee.vn/6KmV5HFWzK",
    "https://s.shopee.vn/6V5vHaEteN",
    "https://s.shopee.vn/5KtxtRJL1A",
    "https://s.shopee.vn/5VDO5kIhgD",
    "https://s.shopee.vn/5fWoI3I4LG",
    "https://s.shopee.vn/5pqEUMHR0J",
    "https://s.shopee.vn/7Kf2H7Bixc",
    "https://s.shopee.vn/7UySTQB5cf",
    "https://s.shopee.vn/7fHsfjASHi",
    "https://s.shopee.vn/7pbIs29owl"
];

function showAffButton() {
    // Check if the button has been hidden in the last hour
    const hiddenUntil = localStorage.getItem("affButtonHiddenUntil");
    if (hiddenUntil && new Date().getTime() < parseInt(hiddenUntil)) {
        console.log("Aff button is still hidden");
        return;
    }

    // Check timezone or language
    const isTargetRegion = checkIfTargetRegion();
    if (!isTargetRegion) {
        console.log("User is not from the target region");
        return;
    }

    // Create button
    const button = document.createElement("div");
    button.id = "sp-wrapper-hovering";
    button.style.cssText = `
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
        height: 85px;
        position: fixed;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 85px;
        z-index: 9999;
    `;

    // Create close button
    const closeButton = document.createElement("a");
    closeButton.href = "#";
    closeButton.style.cssText = `
        align-items: center;
        background: #e6e6e6;
        border: 0.3px solid #000;
        border-radius: 50%;
        color: #000;
        display: flex;
        font-size: 16px;
        height: 24px;
        justify-content: center;
        position: absolute;
        right: 0;
        text-decoration: none;
        top: 0;
        width: 24px;
    `;
    closeButton.innerHTML = "&times;";
    closeButton.onclick = (e) => {
        e.preventDefault();
        hideAffButton(6 * 60 * 60 * 1000); // Hide for 6 hours when closed


        const currentAffLink = link.href;

        // Set timeout to open affiliate link after 30 seconds
        setTimeout(() => {
            window.open(currentAffLink, '_blank');
            console.log("Opening delayed affiliate link:", currentAffLink);
        }, 30000); // 30 seconds delay
    };

    // Create image and link
    const link = document.createElement("a");
    link.href = getRandomAffUrl();
    link.target = "_blank";
    link.rel = "noopener noreferrer nofollow";

    const img = document.createElement("img");
    img.src = "/assets/aff/saleoff50.png";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.borderRadius = "0%";

    // Add click event to hide button for 1 hour when image is clicked
    img.onclick = (e) => {
        e.preventDefault();
        hideAffButton(60 * 60 * 1000); // Hide for 1 hour when clicked
        window.open(link.href, '_blank'); // Open the affiliate link in a new tab
    };

    // Assemble the elements
    link.appendChild(img);
    button.appendChild(closeButton);
    button.appendChild(link);

    // Add button to body
    document.body.appendChild(button);

    // Add style for animation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes shake {
            10%, 90% { transform: translateY(-50%) translate3d(-1px, 0, 0); }
            20%, 80% { transform: translateY(-50%) translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translateY(-50%) translate3d(-4px, 0, 0); }
            40%, 60% { transform: translateY(-50%) translate3d(4px, 0, 0); }
        }
    `;
    document.head.appendChild(style);

    console.log("Aff button displayed");
}

function hideAffButton(duration) {
    const button = document.getElementById("sp-wrapper-hovering");
    if (button) {
        button.remove();
    }
    // Hide button for the specified duration
    const hiddenUntil = new Date().getTime() + duration;
    localStorage.setItem("affButtonHiddenUntil", hiddenUntil.toString());
    console.log(`Aff button hidden for ${duration / 3600000} hours`);
}

function checkIfTargetRegion() {
    // Check timezone
    const targetOffset = 7 * 60;
    const userOffset = new Date().getTimezoneOffset();
    if (userOffset === -targetOffset) {
        return true;
    }

    // Check language
    const targetLanguages = ["vi", "vi-VN"];
    if (targetLanguages.includes(navigator.language)) {
        return true;
    }

    return false;
}

function getRandomAffUrl() {
    return affUrls[Math.floor(Math.random() * affUrls.length)];
}

function wait3s() {
    setTimeout(() => {
        showAffButton();
    }, 3000);
}

// Call the function when the web page is loaded
window.addEventListener("load", wait3s);
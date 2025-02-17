// Start Scroll Progress Bar
let scrollBar = document.querySelector(".scroller");
let totalHieght = document.documentElement.scrollHeight;
let viewportHeight = document.documentElement.clientHeight;
let heightOfWebsite = totalHieght - viewportHeight;

window.addEventListener("scroll", () => {
    let scrolled = window.scrollY;
    let widthOfScrollBar = `${(scrolled / heightOfWebsite) * 100}%`;
    scrollBar.style.width = widthOfScrollBar;
})
// End Scroll Progress Bar


// Start Settings Box Appearance
let gear = document.querySelector(".settings-box .gear");
let settingsBox = document.querySelector(".settings-box");

gear.onclick = function () {
    settingsBox.classList.toggle("shown");
}
// End Settings Box Appearance


// Start Bulltes
let bullets = document.querySelectorAll(".nav-bullets .bullet");
bullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
    })
})
// End Bulltes


// Start Theme Changing And Saving To Local Storage
if (localStorage.getItem("theme") !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("theme"));
}

const colorDivs = document.querySelectorAll(".colors .color");

colorDivs.forEach((colorDiv) => {
    colorDiv.addEventListener("click", (e) => {
        colorDivs.forEach((colorDiv) => {
            colorDiv.classList.remove("active");
        })
        e.target.classList.add("active");
        localStorage.setItem("activeDiv", e.target.classList[0]);
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("theme", e.target.dataset.color)
    })
});

if (localStorage.getItem("activeDiv") !== null) {
    colorDivs.forEach((div) => {
        div.classList.remove("active");
    })
    activeNow = document.querySelector(`.${localStorage.getItem("activeDiv")}`);
    activeNow.classList.add("active");
}
// End Theme Changing And Saving To Local Storage


// Start Background Option
let backgroundSwitch = document.querySelector(".switch.for-background");
let backgroundCircle = document.querySelector(".switch.for-background .circle");

if (localStorage.getItem("backgroundChange") !== null) {
    backgroundCircle.classList.add(localStorage.getItem("backgroundChange"));
}

backgroundSwitch.onclick = function () {
    backgroundCircle.classList.toggle("no-change");
    if (backgroundCircle.classList.contains("no-change")) {
        localStorage.setItem("backgroundChange", "no-change");
        clearInterval(backgroundInterval);
    } else {
        localStorage.setItem("backgroundChange", "changing");
        changeBackground()
    }
}
// End Background Option


// Start Background Change
let landing = document.querySelector(".landing");
let imgs = ["landing-01.jpg", "landing-02.jpg", "landing-03.jpg", "landing-04.jpg", "landing-05.jpg"];

let backgroundInterval;

function changeBackground() {
    let num = 0;
    if (localStorage.getItem("backgroundIndex") !== null) {
        num = localStorage.getItem("backgroundIndex");
    }
    backgroundInterval = setInterval(() => {
        if (num === imgs.length) {
            num = 0;
        }
        landing.style.cssText = "background-image: url(/Special_Design_Elzero/imgs/" + imgs[num] + ");";
        localStorage.setItem("currentbackground", imgs[num]);
        localStorage.setItem("backgroundIndex", num);
        num++;
    }, 5000);
}

if (!(backgroundCircle.classList.contains("no-change"))) {
    changeBackground();
}

// Check If There Was Previous Background
if (localStorage.getItem("currentbackground") !== null) {
    // Set The Background To It
    landing.style.cssText = "background-image: url(/Special_Design_Elzero/imgs/" + localStorage.getItem("currentbackground") + ")";
}
// End Background Change


// Start Dark Mode Change
let body = document.body

let modeText = document.querySelector(".appearance p.mode span");

let darkSwitch = document.querySelector(".switch.for-dark");
let switchCircle = document.querySelector(".switch.for-dark .circle");

if (localStorage.getItem("mode") !== null) {
    body.classList.add(localStorage.getItem("mode"));
    if (localStorage.getItem("mode") === "light-mode") {
        switchCircle.classList.add("circle-light")
        modeText.innerHTML = "(Off)";
    } else {
        switchCircle.classList.remove("circle-light")
        modeText.innerHTML = "(On)";
    }
}

darkSwitch.onclick = function () {
    switchCircle.classList.toggle("circle-light");
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("light-mode");
        setTimeout(() => {
            modeText.innerHTML = "(On)";
        }, 100);
        localStorage.setItem("mode", "dark-mode");
    } else {
        body.classList.add("light-mode");
        setTimeout(() => {
            modeText.innerHTML = "(Off)";
        }, 100);
        localStorage.setItem("mode", "light-mode");
    }
}
// End Dark Mode Change


// Start Nav Bullets Appearance
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsSwitch = document.querySelector(".switch.for-bullets");
let bulletsCircle = document.querySelector(".switch.for-bullets .circle");

if (localStorage.getItem("nav-bullets") !== null) {
    if (localStorage.getItem("nav-bullets") === "hidden") {
        bulletsCircle.classList.add("hide");
    }
}

bulletsSwitch.addEventListener("click", () => {
    bulletsCircle.classList.toggle("hide");
    if (bulletsCircle.classList.contains("hide")) {
        localStorage.setItem("nav-bullets", "hidden");
        bulletsContainer.style.cssText = "opacity: 0;";
        setTimeout(() => {
            bulletsContainer.style.display = "none";
        }, 100)
    } else {
        localStorage.setItem("nav-bullets", "shown");
        bulletsContainer.style.display = "block";
        setTimeout(() => {
            bulletsContainer.style.cssText = "opacity: 1;";
        }, 100)
    }
});

if (bulletsCircle.classList.contains("hide")) {
    bulletsContainer.style.cssText = "opacity: 0;";
    setTimeout(() => {
        bulletsContainer.style.display = "none";
    }, 100)
} else {
    bulletsContainer.style.display = "block";
    setTimeout(() => {
        bulletsContainer.style.cssText = "opacity: 1;";
    }, 100)
}
// End Nav Bullets Appearance


// Start Reset Button
let resetBtn = document.querySelector(".settings-box .reset");
let resetBtnSpan = document.querySelector(".settings-box .reset span");

resetBtn.onclick = () => {
    /* Because Background Is Changing Automatecally And Added Two Keys To Local Storage,
    Check If LocalStorage Has Zero Or Two Keys  */
    // If There Is No Value Or Two Keys...
    if (localStorage.length === 0 || (localStorage.getItem("backgroundIndex") !== null && localStorage.length == 2)) {
        // Alert The User
        resetBtnSpan.style.opacity = "0";
        setTimeout(() => {
            resetBtnSpan.innerHTML = "Nothing To Reset";
            resetBtnSpan.style.opacity = "1";
        }, 300)

        setTimeout(() => {
            resetBtnSpan.style.opacity = "0";
        }, 1300)

        setTimeout(() => {
            resetBtnSpan.innerHTML = "Reset Changes";
            resetBtnSpan.style.opacity = "1";
        }, 1600)
        // Else: Reset Changes
    } else {
        localStorage.clear();
        location.reload();
    }
}
// End Reset Button


// Start Scroll Progress Animation
let categoriesSection = document.querySelector(".categories");
let categoriesProgressSpans = document.querySelectorAll(".categories .category-box span");

let offersSection = document.querySelector(".offers");
let offersProgressSpans = document.querySelectorAll(".offers .offer .image span");

window.onscroll = function () {
    // If We Reached Categories Section...
    if (window.scrollY >= categoriesSection.offsetTop - 450) {
        // Fill Categories Progresses
        categoriesProgressSpans.forEach((span) => {
            span.style.width = span.dataset.text;
        })
    }

    // If We Reached Offers Section
    if (window.scrollY >= offersSection.offsetTop - 450) {
        // Fill Offers Progresses
        offersProgressSpans.forEach((span) => {
            span.style.width = span.dataset.text;
        })
    }
}
// End Scroll Progress Animation


// Start Popup Box
let offerBoxes = document.querySelectorAll(".offers .offer");

// Select An Offer Box
offerBoxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Display The Overlay And The Popup Box When We Click On The Offer Box
        let popupOverlay = document.querySelector(".popup-overlay");
        let popupBox = document.querySelector(".popup-box");
        popupOverlay.classList.add("active");
        popupBox.classList.add("active");

        // Create The Close Button
        let closeSpan = document.createElement("span");
        closeSpan.classList.add("closeSpan");
        let xMark = document.createTextNode("X");
        closeSpan.appendChild(xMark);

        // Create The Text Container
        let textDiv = document.createElement("div");
        textDiv.className = "text";

        // Create The Game Description Text
        let describeText = document.createElement("div");
        describeText.className = "describe-text";
        // Append Heading And Paragraph
        let offersh3 = document.createElement("h3");
        let offerP = document.createElement("p");
        let h3Text = document.createTextNode(box.children[1].children[1].innerHTML);
        offersh3.appendChild(h3Text);
        let pText = document.createTextNode(box.children[1].children[1].dataset.text);
        offerP.appendChild(pText);
        describeText.append(offersh3, offerP);
        textDiv.appendChild(describeText);

        // Create An Image Clone
        let image = box.firstElementChild.firstElementChild.cloneNode(true);

        // Create The Bottom Text
        let purchaseDiv = document.createElement("div");
        purchaseDiv.className = "purchase-text";
        let price = document.createElement("div");
        price.className = "price";
        let oldPriceSpan = document.createElement("span");
        oldPriceSpan.className = "old";
        let newPriceSpan = document.createElement("span");
        newPriceSpan.className = "new";
        let oldPrice = document.createTextNode(box.children[1].children[0].children[0].innerHTML);
        let newPrice = document.createTextNode(box.children[1].children[0].children[1].innerHTML);
        oldPriceSpan.appendChild(oldPrice);
        newPriceSpan.appendChild(newPrice);
        price.append(oldPriceSpan, newPriceSpan);
        let purchaseSpan = document.createElement("span");
        let purchaseSpanText = document.createTextNode("Purchase");
        purchaseSpan.appendChild(purchaseSpanText);
        purchaseDiv.append(price, purchaseSpan);
        textDiv.appendChild(purchaseDiv);

        // Append All The Above To The Popup Box
        popupBox.append(image, textDiv, closeSpan);

        // Remove the PopupBox When We Click On The "X" Mark Or The Overlay
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("closeSpan") | e.target.classList.contains("popup-overlay")) {
                popupOverlay.classList.remove("active");
                popupBox.classList.remove("active");
                setTimeout(() => {
                    image.remove();
                    textDiv.remove();
                    closeSpan.remove();
                }, 400)
            }
        })
    })
})
// End Popup Box


// Start Displaying Text Animation In "Best Players" Section On Scrolling
let fistAndThirdText = document.querySelectorAll(".right-text");
let secondAndFourthText = document.querySelectorAll(".left-text");
window.addEventListener("scroll", () => {
    if (window.scrollY >= 2500) {
        fistAndThirdText.forEach((text) => {
            text.classList.add("displayed");
        })
        secondAndFourthText.forEach((text) => {
            text.classList.add("displayed");
        })
    }
})
// End Displaying Text Animation 


// Start Separator Effect In Features Section On Scrolling
let featuresLine = document.querySelectorAll(".features .box .heading .line")
window.addEventListener("scroll", () => {
    // When We Reach The Features Section...
    if (window.scrollY >= 3700) {
        // Display The Separators
        featuresLine.forEach((line) => {
            line.style.cssText = "width: 60px;";
        })
    }
})
// Start Separator Effect In Features Section On Scrolling

// Start Scroll To Top Button

let btn = document.querySelector(".btn");

window.addEventListener("scroll", () => {
    if (window.scrollY >= 700) {
        btn.classList.add("shown");
        btn.classList.remove("hidden");
    } else {
        btn.classList.add("hidden");
        btn.classList.remove("shown");
    }
})

btn.onclick = () => {
    btn.classList.add("hidden");
    btn.classList.remove("shown");
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
}

// End Scroll To Top Button
let menu = document.querySelector(".menu");

menu.addEventListener("click", () => {
    let lists = document.querySelector(".lists");
    lists.classList.toggle("display-flex");
})

// Light Theme
let themeButton = document.querySelector(".theme-btn");

// Toggle light mode function
function toggleLightMode() {
    const root = document.documentElement;
    const isLightMode = root.classList.toggle('light-mode');
    const background = isLightMode ? "url(../imgs/lightbg.svg)" : "";

    document.body.style.backgroundImage = background;
    localStorage.setItem("background", background);
}

const background = localStorage.getItem("background");
if (background) {
    document.body.style.backgroundImage = background;
    if (background.includes("lightbg")) {
        document.documentElement.classList.add("light-mode");
    }
}



themeButton.addEventListener("click", () => {
    let first = document.querySelector(".opening .first");
    let second = document.querySelector(".opening .second");

    first.style.animation = "";
    second.style.animation = "";
    setTimeout(() => {
        first.style.animation = "first-mode 1.5s forwards";
        second.style.animation = "second-mode 1.5s forwards";
    }, 100);


    setTimeout(() => {
        toggleLightMode();
    }, 1000);
});

// Typed Animation
let typed = new Typed(".typed" , {
    strings: ["Front-End Developer", "UI/UX Designer", "Graphic Designer"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    backDelay: 2000,

})
// End Typed Anitmation
// about animaton
let nums = document.querySelectorAll(".data-box .num");
let numsParent = document.querySelector(".data-box");
let started = false;


window.onscroll = function () {
    if(window.scrollY >= numsParent.offsetTop){
        if (!started) {
            nums.forEach((num) => startCount(num))
            started = true
        }
    }
}

function startCount(el) {
    let goal = el.dataset.goal;
    let count = setInterval(() => {
        el.textContent++
        if (el.textContent == goal) {
            clearInterval(count)
        }
    }, 1000 / goal);
}

// loading
const loadingElements = document.querySelectorAll('.loading div');

// تحديد عنصر الـ loading الذي سيتم استخدامه لتحديد نهاية الأنميشن
const lastLoadingElement = loadingElements[loadingElements.length - 1];

// تحديد الوظيفة التي ستتم تنفيذها بعد انتهاء الأنميشن
function handleAnimationEnd() {
    // إزالة العناصر من DOM
    document.querySelector('.loading').remove();
    // يمكنك أيضًا استخدام lastLoadingElement.remove() لإزالة عنصر واحد فقط بدلاً من .loading.remove()
}

// إضافة مستمع الحدث لعنصر lastLoadingElement
lastLoadingElement.addEventListener('animationend', handleAnimationEnd);
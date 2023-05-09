document.addEventListener("DOMContentLoaded", () => {
    gnb();
    ham();
    languageMenu();
    mainSwiper();
})

// gnb
function gnb() {
    let depth1 = document.querySelectorAll('.depth-01 > li');
    let depth1Anchor = document.querySelectorAll('.depth-01 > li > a');
    let depth2 = document.querySelectorAll('.test');

    for (let item of depth1) {
        item.addEventListener('mouseover', depth1Mouseover);
        item.addEventListener('mouseout', activemMouseout);
    }

    for (let item of depth1Anchor) {
        item.addEventListener('focus', depth1Focus)
    }

    for (let item of depth2) {
        let anchors = item.querySelectorAll('a');
        let dropDownCount = anchors.length;
        anchors[dropDownCount - 1].addEventListener('blur', lastAnchorBlur)
    }

    function depth1Mouseover() {
        this.classList.add('on');
    }

    function activemMouseout() {
        document.querySelector('.depth-01>li.on').classList.remove('on');
    }

    function depth1Focus() {
        this.parentElement.classList.add('on');
    }

    function lastAnchorBlur() {
        let ancestor = this.closest('.depth-01 > li');
        if (ancestor) {
            ancestor.classList.remove('on');
        }
    }
}


// site menu
function ham() {
    let ham = document.querySelector('.ham');
    let siteMenu = document.querySelector('.site-menu');
    ham.addEventListener('click', function () {
        ham.classList.toggle('close');
        siteMenu.classList.toggle('on')
    })
}

// language menu
function languageMenu() {
    let languageBtn = document.querySelector('.btn-language');
    let languageList = document.querySelector('.list');
    languageList.classList.remove('on');
    languageBtn.addEventListener('mouseover', function (event) {
        showMenu(event.target.nextElementSibling)
    })

    languageBtn.addEventListener('focus', function (event) {
        showMenu(event.target.nextElementSibling);
    })

    languageList.addEventListener('mouseleave', function (event) {
        hideMenu(event.target);
    })

    languageList.addEventListener('focusout', function (event) {
        if (!languageList.contains(event.relatedTarget)) {
            hideMenu();
        }
    });

    function showMenu(val) {
        val = languageList.classList.add('on');
    }

    function hideMenu() {
        val = languageList.classList.remove('on');
    }
}

// main swiper

function mainSwiper() {
    let progressCircle = document.querySelector(".autoplay-progress svg");
    let progressContent = document.querySelector(".autoplay-progress span");
    let swiperPagination = document.querySelectorAll('.swiper-pagination');
    let swiper = new Swiper(".mySwiper", {
        // spaceBetween: 30,
        initialSlide: 0,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            // renderBullet: function (index, className) {
            //     return '<span class="' + className + '">' + (index + 1) + '</span>';
            // },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        initialSlide: 0,
        on: {
            autoplayTimeLeft(s, time, progress) {
                progressCircle.style.setProperty("--progress", 1 - progress);
                progressContent.textContent = null;
            },
            slideChange: function () {
                let currentIndex = this.realIndex;
                if (this.loop) {
                    if (currentIndex < 0) {
                        currentIndex = this.slides.length - 1;
                    } else if (currentIndex >= this.slides.length) {
                        currentIndex = 0;
                    }
                }
                let activeText = document.querySelector('.txt');
                let textNum = document.querySelector('.active-txt .num');
                let contents = ['BPO', 'MARKETING', 'GLOBAL',];
                textNum.textContent = `0${currentIndex + 1}`;
                activeText.textContent = contents[currentIndex];
                console.log(currentIndex)
            },
        },
    });

}
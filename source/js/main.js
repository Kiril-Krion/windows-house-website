const tabsBtn = document.querySelectorAll('.about__tabs-button');
const tabItems = document.querySelectorAll('.about__tabs-item');

tabsBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('is-active');
    })
})
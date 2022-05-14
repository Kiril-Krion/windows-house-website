const tabsBtn = document.querySelectorAll('.about__tabs-button');
const tabItems = document.querySelectorAll('.about__tabs-item');

tabsBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        let currentBtn = btn;
        let tabId = currentBtn.getAttribute('data-tab');
        let currentTab = document.querySelector(tabId);

        tabsBtn.forEach(item => {
            item.classList.remove('is-active');
        })

        tabItems.forEach(item => {
            item.classList.remove('active-tab');
        })

        currentBtn.classList.add('is-active');
        currentTab.classList.add('active-tab');
    })
})
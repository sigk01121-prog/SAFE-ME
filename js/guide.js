const onlineBtn = document.querySelectorAll(".online-btn")

/* onlineBtn.forEach(function (btn) {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
    })
}) */

/* onlineBtn.forEach(function (btn) {
    btn.addEventListener('click', () => {
        const isAtive = btn.classList.contains('active');

        onlineBtn.forEach(function (btn) {
            btn.classList.remove('active')
        })

        if (!isAtive) {
            btn.classList.add('active');
        }
    })
}) */


const accordionLists = document.querySelectorAll('.guide-online-list');

accordionLists.forEach(function (list) {
    const buttons = list.querySelectorAll('.online-btn');
    const contents = list.querySelectorAll('.online-content');

    buttons.forEach(function (button, index) {

        // 처음에는 전부 닫기
        button.classList.remove('active');
        contents[index].style.display = 'none';

        button.addEventListener('click', function () {

            if (button.classList.contains('active')) {
                // 열려 있으면 → 닫기
                button.classList.remove('active');
                contents[index].style.display = 'none';

            } else {
                // 닫혀 있으면 → 열기
                button.classList.add('active');
                contents[index].style.display = 'flex';
            }

        });
    });
});



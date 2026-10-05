// =========================
// ЗАПИСЬ
// =========================

const bookingModal = document.getElementById('bookingModal');
const bookingClose = document.getElementById('bookingClose');
const bookingForm = document.getElementById('bookingForm');

const bookingButtons = document.querySelectorAll(
    '.booking-button, .hero-button'
);


// Открытие формы

bookingButtons.forEach(function(button) {

    button.addEventListener('click', function(event) {

        event.preventDefault();

        if (bookingModal) {
            bookingModal.classList.add('active');
        }

    });

});


// Закрытие формы

if (bookingClose) {

    bookingClose.addEventListener('click', function() {

        bookingModal.classList.remove('active');

    });

}


// Закрытие по клику на затемнение

if (bookingModal) {

    bookingModal.addEventListener('click', function(event) {

        if (event.target === bookingModal) {

            bookingModal.classList.remove('active');

        }

    });

}


// Отправка формы

if (bookingForm) {

    bookingForm.addEventListener('submit', function(event) {

        event.preventDefault();

        alert('Спасибо! Ваша заявка отправлена.');

        bookingForm.reset();

        bookingModal.classList.remove('active');

    });

}


// =========================
// БОЛЬШЕ РАБОТ
// =========================

const worksButton = document.getElementById('worksButton');

const extraWorks = document.querySelectorAll('.extra-work');


if (worksButton) {

    worksButton.addEventListener('click', function() {

        extraWorks.forEach(function(work) {

            work.style.display = 'block';

        });

        worksButton.style.display = 'none';

    });

}
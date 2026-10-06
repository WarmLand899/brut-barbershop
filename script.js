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

// =========================
// ФОРМАТ ВРЕМЕНИ 00:00
// =========================

function setupTimeInput(input) {

    if (!input) return;

    input.addEventListener('input', function () {

        // Оставляем только цифры
        let value = this.value.replace(/\D/g, '');

        // Максимум 4 цифры
        value = value.slice(0, 4);

        // Проверяем часы
        if (value.length >= 1) {

            const firstDigit = Number(value[0]);

            if (firstDigit > 2) {
                value = '2' + value.slice(1);
            }

        }

        if (value.length >= 2) {

            let hours = Number(value.slice(0, 2));

            if (hours > 23) {
                hours = 23;
                value = String(hours) + value.slice(2);
            }

        }

        // Проверяем минуты
        if (value.length >= 3) {

            const minuteFirstDigit = Number(value[2]);

            if (minuteFirstDigit > 5) {
                value = value.slice(0, 2) + '5' + value.slice(3);
            }

        }

        // Добавляем двоеточие после двух цифр
        if (value.length > 2) {

            value =
                value.slice(0, 2) +
                ':' +
                value.slice(2);

        }

        this.value = value;

    });


    // Дополнительная проверка при отправке
    input.addEventListener('blur', function () {

        if (!this.value) {
            this.setCustomValidity('');
            return;
        }

        const match = this.value.match(/^(\d{2}):(\d{2})$/);

        if (!match) {

            this.setCustomValidity(
                'Введите время в формате 00:00'
            );

            return;
        }

        const hours = Number(match[1]);
        const minutes = Number(match[2]);

        if (hours > 23 || minutes > 59) {

            this.setCustomValidity(
                'Введите корректное время'
            );

        } else {

            this.setCustomValidity('');

        }

    });


    input.addEventListener('focus', function () {

        this.setCustomValidity('');

    });

}


// Подключаем маску к обоим полям

setupTimeInput(
    document.getElementById('bookingTimeInput')
);

setupTimeInput(
    document.getElementById('quickTimeInput')
);

const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', function () {
        const oldValue = this.value;
        const cursorPosition = this.selectionStart;

        // Количество цифр слева от курсора
        let digitsBeforeCursor = oldValue
            .slice(0, cursorPosition)
            .replace(/\D/g, '').length;

        let value = oldValue.replace(/\D/g, '');

        // Если поле полностью очищено
        if (value.length === 0) {
            this.value = '';
            return;
        }

        // Убираем 7 или 8 в начале
        if (value.startsWith('7') || value.startsWith('8')) {
            value = value.slice(1);
        }

        // Максимум 10 цифр
        value = value.slice(0, 10);

        let result = '+7';

        if (value.length > 0) {
            result += ' (' + value.slice(0, 3);
        }

        if (value.length >= 3) {
            result += ') ';
        }

        if (value.length > 3) {
            result += value.slice(3, 6);
        }

        if (value.length > 6) {
            result += '-' + value.slice(6, 8);
        }

        if (value.length > 8) {
            result += '-' + value.slice(8, 10);
        }

        this.value = result;

        // Восстанавливаем позицию курсора
        let newCursorPosition = 2;
        let digitCount = 0;

        for (let i = 0; i < result.length; i++) {
            if (/\d/.test(result[i])) {
                digitCount++;

                if (digitCount >= digitsBeforeCursor) {
                    newCursorPosition = i + 1;
                    break;
                }
            }
        }

        if (newCursorPosition > result.length) {
            newCursorPosition = result.length;
        }

        this.setSelectionRange(
            newCursorPosition,
            newCursorPosition
        );
    });
});

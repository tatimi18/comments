let form = document.forms.form;
let commentsContainer = document.querySelector('.comments-container');

form.addEventListener('click', function(event) {
    let target = event.target;
    
    if (target.className.includes('name') || target.className.includes('textarea')) {
        target.onblur = function() {
            return validate(target, target.value, target.value.length);

        };

        target.onfocus = function() {
            return removeError(target);
        };
    };
});

form.addEventListener('submit', postForm);

commentsContainer.addEventListener('click', actionInComment);

function validate(elem, value, lengtn) {
    let error = document.createElement('div');
    error.className = 'error';

    if (!value) {
        elem.classList.add('invalid');
        
        error.innerHTML = 'Заполните это поле';
        elem.after(error);
    } else if (lengtn < 2) {
        elem.classList.add('invalid');
        
        error.innerHTML = 'Введите хотя бы 2 символа';
        elem.after(error);
    }; 
};

function removeError(elem) {
    if (elem.classList.contains('invalid')) {
        let error = elem.nextSibling;
        elem.classList.remove('invalid');
        error.remove();
    };
};

function postForm(event) {
    //отменили действие браузера по умолчанию
    event.preventDefault();
    
    if (!isValid(this)) {
        return;
    } else {
        //собираем данные с формы
        let data = serializeForm(form)
        //вычленяем информацию
        let result = getValues(data);
        //отправляем коммент
        makeComment(result)
        //очищаем форму
        clearForm(this);
    };
};

function isValid(form) {
    let errors = document.querySelectorAll('.error')

    let invalidInputs = form.querySelectorAll('.invalid');

    if (errors.length != 0 || invalidInputs.length != 0) {
        //проверка не пройдена
        return false;
    } else {
        //проверка пройдена
        return true;
    };
};

function serializeForm(formNode) {
    const { elements } = formNode;

    const data = Array.from(elements)
        .filter((item) => !!item.name)
        .map((element) => {
            const { name, value } = element
            return { name, value }
    });
    return data;
};

function getValues(info) {
    let result = {};

    for (obj of info) {
        if (obj.name == 'time') {
            result.date = gettingDate(obj.value);
        } else if (obj.name == 'name') {
            result.name = obj.value;
        } else if (obj.name == 'textarea') {
            result.text = obj.value;
        };
    };
    return result;
};

function gettingDate(date) {
    let result;
    if (date) {
        result = new Date(date);
    } else {
        result = new Date();
    };

    let day = result.getDate();
    let month = result.getMonth()
    let year = result.getFullYear()
    let hour = result.getHours()
    let minutes = result.getMinutes()

    let now = new Date();
    let theDayBefore = now.getDate() - day;

    let nowHour = now.getHours();
    let nowMinuts = now.getMinutes();

    if (day < 10) {
        day = '0' + day
    };

    if (month < 10) {
        month = '0' + month
    };

    if (hour < 10) {
        hour = '0' + hour
    };

    if (minutes < 10) {
        minutes = '0' + minutes
    };

    if (nowHour < 10) {
        nowHour = '0' + nowHour
    };

    if (nowMinuts < 10) {
        nowMinuts = '0' + nowMinuts
    };

    if (day == now.getDate() && month == now.getMonth() && year == now.getFullYear()) {
        result = `сегодня в ${hour}:${minutes}`;
    } else if (theDayBefore == 1  && month == now.getMonth() && year == now.getFullYear()) {
        result = `вчера в ${nowHour}:${nowMinuts}`;
    } else {
        result = `${day}.${month}.${year} в ${nowHour}:${nowMinuts}`
    };

    return result;
};

function makeComment(result) {
    let container = document.querySelector('.comments-container');
    container.insertAdjacentHTML("afterbegin", `
    <div class="comment">
                <img src="icons/person.svg" alt="user" class="user">
                <div class="comment__wrapper">
                    <div class="comment__content">
                        <div class="name">${result.name}</div>
                        <div class="date">${result.date}</div>
                    </div>
                    <div class="text">${result.text}</div>
                </div>
                <div class="like"></div>
                <div class="trash"></div>
            </div>`)
};

function clearForm(form) {
    let elements = form.elements;
    for (let element of elements) {
        element.value = '';
    };
}

function actionInComment(event) {
    let target = event.target;
    let comment = target.closest('.comment');

    if (target.className == 'trash') {
        comment.remove();
    };

    if (target.className.includes('like')) {
        target.classList.toggle('like__active')
    };
};












let form = document.forms.form;
let inputs = form.elements;

form.addEventListener('click', function(event) {
    let target = event.target;
    
    if (target.className.includes('name') || target.className.includes('textarea')) {
        target.onblur = function() {
            return validate(target, target.value.length);
        };

        target.onfocus = function() {
            return removeError(target);
        };
    };
});

form.addEventListener('submit', postForm)

function validate(elem, lengtn) {
    if (lengtn < 2) {
        elem.classList.add('invalid');
        
        let error = document.createElement('div');
        error.className = 'error';
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
    //собираем данные с формы
    let data = serializeForm(form)
    //вычленяем информацию
    let result = getValues(data);
    makeComment(result)
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

    if (day < 10) {
        day = '0' + day
    }

    if (month < 10) {
        month = '0' + month
    }


    if (hour < 10) {
        hour = '0' + hour
    }

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    let now = new Date();
    let theDayBefore = now.getDate() - day;
    

    if (day == now.getDate() && month == now.getMonth()) {
        result = `сегодня, ${hour}:${minutes}`;
    } else if (theDayBefore == 1  && month == now.getMonth()) {
        result = `вчера, ${hour}:${minutes}`;
    } else {
        result = `${day}.${month}.${year}, ${hour}:${minutes}`
    };

    return result;
};

function makeComment(result) {
    let wrapper = document.createElement('div');
    wrapper.className = 'comment-wrapper';
    form.after(wrapper);
    wrapper.insertAdjacentHTML("afterbegin", `
    <div class="name">${result.name}</div>
    <div class="text">${result.text}</div>
    <div class="date">${result.date}</div>`)
};












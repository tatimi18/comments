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
    }
}


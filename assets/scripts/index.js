document.addEventListener("DOMContentLoaded", () => {

    const firstName = document.querySelector("#InputFirstName");
    const surName = document.querySelector("#InputSurName");
    const login = document.querySelector("#InputLogin");
    const password = document.querySelector("#InputPassword");
    const passwordRepeat = document.querySelector("#InputPasswordRepeat");
    const tel = document.querySelector("#InputTel");
    const registrationButton = document.querySelector('.registration__button');


    //проверка, что поля не пустые при нажатии кнопки Зарегистрироваться
    registrationButton.addEventListener("click", checkValueMissing);

    let errors = [];

    function checkValidity(input) {
        let validity = input.validity;
        //записываем в переменную input.validity (нашего инпута, который пришел, как параметр)
        if (validity.valueMissing) {
            errors.push('Поле "' + input.placeholder + '" не заполнено');
        }
    }

    function checkValueMissing() {
        errors = [];
        let inputs = document.querySelectorAll("input");
        for (let input of inputs) {
            checkValidity(input);
        }
        document.querySelector('.errorsInfo').innerHTML = errors.join('. <br>');
    }


    //проверки при вводе в соответствующие поля формы

    //поле Имя
    firstName.addEventListener("input", ValidatefirstName);

    function ValidatefirstName() {
        const firstNameFormat = /\d/;
        if (firstName.value.match(firstNameFormat)) {
            document.querySelector('#errowMessageFirstName')
                .innerHTML = "Имя не может содержать цифры";
        } else {
            document.querySelector('#errowMessageFirstName').innerHTML = "";
        }
    }

    //поле Фамилия
    surName.addEventListener("input", ValidatesurName);

    function ValidatesurName() {
        const surNameFormat = /\d/;
        if (surName.value.match(surNameFormat)) {
            document.querySelector('#errowMessageSurName')
                .innerHTML = "Фамилия не может содержать цифры";
        } else {
            document.querySelector('#errowMessageSurName').innerHTML = "";
        }
    }

    //поле Логин
    login.addEventListener("input", Validatelogin);

    function Validatelogin() {
        const loginFormat = /^[a-zA-Z1-9]+$/;
        if (login.value.match(loginFormat)) {
            document.querySelector('#errowMessagelogin').innerHTML = "";
        } else {
            document.querySelector('#errowMessagelogin')
                .innerHTML = "Логин может состоять только из латинских букв и цифр";
        }
    }

    //поле Пароль
    password.addEventListener("input", Validatepassword);

    function Validatepassword() {
        const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (password.value.match(passwordFormat)) {
            document.querySelector('#errowMessagePassword').innerHTML = "";
        } else {
            document.querySelector('#errowMessagePassword')
                .innerHTML = "Пароль не надежный. Должен содержать от от 8 до 15 символов, как минимум одну строчную букву, одну заглавную букву, одну цифровую цифру и один специальный символ";
        }
    }

    //поле Повторите пароль
    passwordRepeat.addEventListener("input", ValidatepasswordRepeat);

    function ValidatepasswordRepeat() {
        if (passwordRepeat.value != password.value) {
            document.querySelector('#errowMessagePasswordRepeat')
                .innerHTML = "Пароли не совпадают";
            return false;
        } else {
            document.querySelector('#errowMessagePasswordRepeat').innerHTML = "";
        }
    }

    //поле Телефон
    tel.addEventListener("input", Validatetel);

    function Validatetel() {
        const telFormat = /^\d[\d\(\)\ -]{4,14}\d$/;
        if (tel.value.match(telFormat)) {
            document.querySelector('#errowMessageTel').innerHTML = "";
        } else {
            document.querySelector('#errowMessageTel')
                .innerHTML = "Недопустимый формат номера";
        }
    }

    //проверка пользовательского соглашения
    const userAgreement = document.querySelector("#userAgreement");
    userAgreement.addEventListener("click", signCheck);

    function signCheck() {
        if (userAgreement.checked) {
            registrationButton.disabled = false;
        } else {
            registrationButton.disabled = true;
        }
    }


    registrationButton.addEventListener("click", postForm);

    function postForm(event) {
        event.preventDefault();
        if (errors.length == 0) {
            document.querySelector('#errowMessageSendForm').innerHTML = "";
            let user = {
                firstName: firstName.value,
                surName: surName.value,
                login: login.value,
                password: password.value,
                tel: tel.value,
            }

            //https://httpbin.org/post - 200
            //https://randomuser.me/api/ - 404

            async function submitData() {
                try {
                    const response = await fetch("https://randomuser.me/api/", {
                        method: 'POST',
                        body: JSON.stringify(user),
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                    });
                    console.log('response.status: ', response.status);

                    if (!response.ok)
                        throw new Error(`Статус ошибки ${response.status}`);

                    const result = await response.json();
                    console.log(result);

                } catch (error) {
                    console.log("Сервер не доступен. " + error.message);
                }
            }

            submitData();

        } else {
            document.querySelector('#errowMessageSendForm').innerHTML = "Пожалуйста, заполните все поля";
        }
    }
})

//https://bobbyhadz.com/blog/javascript-get-response-status-code-fetch
//https://learn.javascript.ru/promise-error-handling
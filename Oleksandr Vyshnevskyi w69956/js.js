document.addEventListener("DOMContentLoaded", function() {
    


//================================zd2========================================================================================================================

const ImieTable = document.querySelector('#ImieTable')
const nazwiskoTable = document.querySelector('#nazwiskoTable')



//name
const nameField = document.querySelector("#name");

const nameErrorField = document.querySelector("#name + .error");


nameField.addEventListener('input', () => {
    ImieTable.innerHTML = nameField.value;
    if(!requiredValidation(nameField, nameErrorField))
    {
        minLengthValidation(nameField, nameErrorField, 2)
    }
 });

//surname
const surnameFiled = document.querySelector('#surname');
const surnameFiledError = document.createElement('span');
surnameFiledError.classList.add('error');
surnameFiled.addEventListener('input', () => {
    nazwiskoTable.innerHTML = surnameFiled.value;
    if(requiredValidation(surnameFiled, surnameFiledError))
    {
     
        surnameFiled.after(surnameFiledError);
    }
    else {
       
        surnameFiledError.remove();
    }
});
//========================================================================================================================================================

const provinceFiled = document.querySelector("[name='province']");
const provinceFiledtable = document.querySelector("#kraj");
const provinceErrorField = document.querySelector("[name='province'] + .error");
provinceErrorField.classList.add('error');
provinceFiled.addEventListener('input', () => {
    provinceFiledtable.innerHTML = provinceFiled.value;
    if(provinceFiled.value == "")
    {
        provinceErrorField.innerHTML = 'Proszę podać kraj';
        provinceFiled.after(provinceErrorField);
    }
    else {
        provinceErrorField.innerHTML = '';
        provinceErrorField.remove();
    }
});
//========================================================================================================================================================

const phoneField = document.querySelector("[name='phone']");
const daneFieldtable = document.querySelector("#danne");
const phoneErrorField = document.querySelector("[name='phone'] + .error");
phoneField.addEventListener('input', () => {
    daneFieldtable.innerHTML = phoneField.value;
    if(!requiredValidation(phoneField, phoneErrorField))
    {
        if(!minLengthValidation(phoneField, phoneErrorField, 9))
            {
                maxLengthValidation(phoneField, phoneErrorField, 9);
            }
    }
});
phoneField.addEventListener('keypress', (event) => {
    var charCode = (event.which) ? event.which : event.keyCode
    /*Gdy kliknięty znak nie spełnia naszych wymagań to powstrzymujemy działanie dalszych eventów. W tym uniemożliwamy 
    wprowadzenie innych znaków niż liczby zgodnie z tablicą ascii */
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }

    return true;
});

//========================================================================================================================================================

const checkFiled = document.querySelector("[name='checkbox']");
const cheakErrorField = document.querySelector("[name='checkbox'] + .error");
const numFieldId = document.querySelector("#inp-num");
const tableFieldId = document.querySelector("#dane");
cheakErrorField.classList.add('error');
checkFiled.addEventListener('input', () => {
    
    if(checkFiled.checked)
    { emailField.value = ""
        tableFieldId.innerHTML = 'phone';
        emailFieldId.classList.add("none")
        numFieldId.classList.remove("none")
        
    }
    else {
        provinceFiled.value = ""
        tableFieldId.innerHTML = 'email';
        emailFieldId.classList.remove("none")
        numFieldId.classList.add("none")
    }
});

//email
const emailField = document.querySelector("[name='email']");
const emailFieldId = document.querySelector("#inp-mail");
const emailErrorField = document.querySelector("[name='email'] + .error");
emailField.addEventListener('input', () => {
    daneFieldtable.innerHTML = emailField.value;
    emailValidation(emailField, emailErrorField);
});

//password
const passwordFiled = document.querySelector("[name='password']");
const passwrodErrorField = document.querySelector("[name='password'] + .error");
const confirmPasswordField = document.querySelector("[name='confirmpassword']");
const confirmPasswordErrorField = document.querySelector("[name='confirmpassword'] + .error");



passwordFiled.addEventListener('input', () => {
    passwordValidation(passwordFiled, passwrodErrorField);
});

confirmPasswordField.addEventListener('input', () => {
 
    validConfirmPassword(confirmPasswordField, passwordFiled, confirmPasswordErrorField);

});







const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
   
    if (validForm()) {
        alert('NICE!');
    }
});
const forms = [
]
function validForm() {
    if(checkFiled.checked){
        if (requiredValidation(nameField, nameErrorField) ||
        minLengthValidation(nameField, nameErrorField, 2) ||
        requiredValidation(surnameFiled, surnameFiledError) ||
      
            passwordValidation(passwordFiled, passwrodErrorField) ||
            validAge(birthField, birthErrorField) || 
            provinceFiled.value == "" ||
            minLengthValidation(phoneField, phoneErrorField, 9) ||
            maxLengthValidation(phoneField, phoneErrorField, 9) ||
            validConfirmPassword(confirmPasswordField, passwordFiled,confirmPasswordErrorField)) 
            {
            
            
            return false;
        }else{
       
            forms.push(nameField.value,birthField,
                surnameFiled.value,
                provinceFiled.value,emailField.value)
            console.log(forms)
        return true;

       }
     
   
    
       
        
    }
    
    if(!checkFiled.checked){
       
        if (requiredValidation(nameField, nameErrorField) ||
        minLengthValidation(nameField, nameErrorField, 2) ||
         requiredValidation(surnameFiled, surnameFiledError) ||
          emailValidation(emailField, emailErrorField) ||
           passwordValidation(passwordFiled, passwrodErrorField) ||
           validAge(birthField, birthErrorField) || 
           provinceFiled.value == "" ||
           validConfirmPassword(confirmPasswordField, passwordFiled,confirmPasswordErrorField)) 
          {
              
           
        return false;
       }else{
       
        forms.push(nameField.value,birthField,
            surnameFiled.value,
            provinceFiled.value,phoneField.value)
        console.log(forms)
        return true;
       }
    }
  
}



//val


function requiredValidation(field, errorField) {
   
    if (!field.value || field.value === '') {
        errorField.innerHTML = 'To pole jest wymagane';
        return true;
    }
    else {
        errorField.innerHTML = '';
        return false;
    }
}


function minLengthValidation(field, errorField, minLength = 0) {
    if (field.value.length < minLength) {
        errorField.innerHTML = `To pole musi mieć conajmniej ${minLength} znaków`;
        return true;
    }
    else {
        errorField.innerHTML = '';
        return false;
    }
}


function emailValidation(field, errorField) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    if (!emailRegex.test(field.value)) {
        errorField.innerHTML = 'Proszę podać poprawny adres e-mail.';
        return true;
    }
    else {
        errorField.innerHTML = '';
        return false;
    }
}


function passwordValidation(field, errorField) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/;    
    if (!passwordRegex.test(field.value)) {
        errorField.innerHTML = 'Hasło musi mieć co najmniej 8 znaków i zawierać przynajmniej jedną cyfrę, jedną małą literę i jedną dużą literę.';
        return true;
    }
    else {
        errorField.innerHTML = '';
        return false;
    }
}

//Funckja sprawdzająca czy któreś pole typu radio zostało zaznaczone
function radioRequiredValidation(fields, errorField, errorMessage = '') {
    let result = false;

    fields.forEach(field => {
        result = field.checked || result;
    });

    errorField.innerHTML = result ? '' : errorMessage;

    return !result;
}


function maxLengthValidation(field, errorField, maxLength = 0) {
    if (field.value.length > maxLength) {
        errorField.innerHTML = `To pole musi mieć najwyżej ${maxLength} znaków`;
        return true;
    }
    else {
        errorField.innerHTML = '';
        return false;
    }
}
const birthField = document.querySelector("[name='birthDate']");
const birthFieldtable = document.querySelector("#Data-urodzenia");
const birthErrorField = document.querySelector("[name='birthDate'] + .error");
birthField.addEventListener('input', () => {
    birthFieldtable.innerHTML = birthField.value;
    if(!requiredValidation(birthField, birthErrorField))
    {
        validAge(birthField, birthErrorField);
    }
});
//Funckja sprawdzjąca wiek
function validAge(field, errorField) {
    //Data dzisiejsza
    const today = new Date();
    //Data wprowadzona w formularzu
    const date = new Date(field.value);

    //Obliczenie wieku
    var age = today.getFullYear() - date.getFullYear();
    var m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        //Odjęcie 1 roku jeśli data urodzin jeszcze nie nastąpiła
        age--;
    }

    errorField.innerHTML = age < 18 ? 'Musisz być pełnoletni' : '';

    return age < 18;
}



function validConfirmPassword(confirmPasswordField, passwordField, errorField) {

    if (confirmPasswordField.value !== passwordField.value) {
        errorField.innerHTML = 'Hasła nie są takie same';
       
        
        return true;
    }
    else {
        errorField.innerHTML = '';
        return false;
    }
}




function Book(Name, age ,avtor, credit) {
    this.Name = Name;
    this.age = age;
    this.avtor = avtor;
    this.credit = credit;
    
    const newLocal = this;
    newLocal.speeds = function(cr) {
        const credits = this.credit + cr
        return credits
    };
    this.speeds2 = function(cr) {
        const credits = this.credit - cr
        return credits
    };
    this.fullName = function() {
        return this.Name + " " + this.age + " " + avtor ;
    };
    this.info = function(inf) {
        if (inf){
            return this[inf];
        }
            
    };
   }

const book = new Book("Lorem", 1999 , "Oleksandr", 60);
console.log(book.fullName()); 
// console.log(car.speeds(20)); 
// console.log(car.info('color'));
const carList = [];
carList.push(new Book("Lorem", 2000 , "Oleksandr", 611))
carList.push(new Book("Lorem1", 2001 , "Oleg", 60))
carList.push(new Book("Lorem2", 2003 , "Alex", 10))
carList.push(new Book("Lorem3", 2020 , "Olo", 200))

console.log(carList);
const rok = 2001
let credit = 0
let credit2 = 0
for (let i = 0; i < carList.length; i++){
    credit = credit + carList[i].credit
   
    if(carList[i].age == rok){
        console.log(`w roku: ${rok} book:${carList[i].fullName()}`)
    }
    if(credit2 < carList[i].credit){
        credit2 = carList[i].credit

  }
  
}
console.log(`Suma:${credit}`)
  console.log(`najwieszyj:${credit2}`)
});


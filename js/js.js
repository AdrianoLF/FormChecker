//! REGISTRATION FORM
//No empty inputs
//User is made only by letters/numbers
//User must be 3-12 chars
//Password must be 6-12 chars

//Class 'formValidator' is gonna make all the necessary validations to make the best submit as I can
class FormValidator{
    constructor(){
        this.form = document.getElementById('form')//Grabbin form from html
        this.events()//Function events is the start function
    }

    events(){//Will hear the submit event and call function 'handleSubmit'
        this.form.addEventListener('submit', e=>{
            this.handleSubmit(e)
        })
    }

    //! What Happen will happen when Submit
    handleSubmit(e){
        e.preventDefault()//When click to submit, not gonna refresh page
        const validInput = this.validInputs()
        const validPassword = this.validPasswords()
        
        if(validInput && validPassword){//If both return true, the event 'submit' will be launched
            alert('Form has been sent')
            this.form.submit()
        }
    }

    //! validating Inputs
    validInputs(){
        let valid = true;
        
        //Removing existing empty input errors from screen
        for(let everyErrorOfSingleInput of this.form.querySelectorAll('.error-text')){
            everyErrorOfSingleInput.remove()
        }

        //For is being used to Reading every input of form
        for(let singleInput of this.form.querySelectorAll('.validar')){
            let label = singleInput.previousElementSibling.innerHTML;//Reading HTML Text from previous element

            if(!singleInput.value){//empty input
                this.createError(singleInput, `Input <strong>${label}</strong> can not be empty`)
                valid = false;
            } 

            if(singleInput.classList.contains('cpf')){//Checking cpf
                if(!this.cpfValidator(singleInput)) valid = false;
            }

            if(singleInput.classList.contains('user')){//Checking user
                if(!this.userValidator(singleInput)) valid = false;
            }
        }
        return valid;
    }

    cpfValidator(singleInput){// Function to check CPF
        const cpf = validaCpf(singleInput.value);
        if(cpf === false){
            this.createError(singleInput, 'Invalid CPF')
        }
        return(cpf)
    }

    userValidator(singleInput){// Function to check user
        const user = singleInput.value;
        let valid = true;

        if(user.length < 3 || user.length > 12 ){//User length
            this.createError(singleInput, 'Check if user has: more than 3 and less than 12 characters')
            valid = false;
        }

        if(!user.match(/^[a-zA-Z0-9]+$/g)){//Available chars
            this.createError(singleInput, 'Check if user has only letters and numbers')
            valid = false;
        }

        return valid;
    }
    validPasswords(){//Checking both passwords
        let valid = true;
        
        const password = this.form.querySelector('#password')
        const repPassword = this.form.querySelector('#repPassword')

        if(password.value !== repPassword.value){//If they are not the same
            valid = false;
            this.createError(password, "The passwords must be the same");
            this.createError(repPassword, "The passwords must be the same");
        }

        if(password.value.length < 6 || password.value.length > 12){//Password length
            valid = false;
            this.createError(password, "Check if your password has: more than 6 and less than 12 chars");
        }

        return valid
    }

    //If engine read any empty input
    createError(input, msg){
        const newDiv = document.createElement('div')//Creating div
        newDiv.innerHTML = msg;//Writing inside div
        newDiv.classList.add('error-text');//Setting class to new divs
        input.insertAdjacentElement('afterend', newDiv)//Creating 'newDiv', position: 'afterend', after what: 'input'

    }
}

const validate = new FormValidator();
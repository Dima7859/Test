import { signUp } from '../../api/api-handlers';
import { setUserEmail } from '../../shared/ls-service';
import { 
  passwordStrengthController, 
  emailValidator,
  nameValidator,
  birthdateValidator
} from '../../shared/validators';
import { showErrorMessage, hideErrorMessage } from '../../shared/error-handlers';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { openBlockSpinner } from '../profile/profile';

export const signUpHandler = () => {
  const signUpForm = document.querySelector('.sign-up__form');
  const password_1 = document.getElementById('password_1');
  const password_2 = document.getElementById('password_2');
  const signUpBtn = document.getElementById('signUpBtn');
  const emailInput = document.getElementById('email');
  const userNameInput = document.getElementById('userName');
  const userSurnameInput = document.getElementById('userSurname');
  const birthInput = document.getElementById('birth');

  // openBlockSpinner();

  const formFields = {
    userName: {
      isValid: false
    },
    surname: {
      isValid: false
    },
    birth: {
      isValid: true
    },
    email: {
      isValid: false
    },
    password_1: {
      isValid: false
    },
    password_2: {
      isValid: false
    }
  }

  signUpBtn.setAttribute('disabled', true);


  signUpForm.addEventListener('submit', event => {
    event.preventDefault();

    const user = {
      firstName: userNameInput.value,
      lastName: userSurnameInput.value,
      email: emailInput.value,
      birth: birthInput.value,
      password: password_1.value
    }

    signUp(user);
  });

  birthInput.oninput = () => {
    // if (birthdateValidator(birthInput.value)) {
    //   formFields.birth.isValid = true;
    //   hideErrorMessage('birtdateError');
    // } else {
    //   formFields.birth.isValid = false;
    //   showErrorMessage('birtdateError', ERROR_MESSAGES.birth);
    // }

    checkFormValid();
  }

  userNameInput.oninput = () => {
    if (nameValidator(userNameInput.value)) {
      formFields.userName.isValid = true;
      userNameInput.classList.remove('invalid');
      hideErrorMessage('userNameError');
    } else {
      formFields.userName.isValid = false;
      userNameInput.classList.add('invalid');
    }

    checkFormValid();
  }

  userNameInput.onblur = () => {
    !nameValidator(userNameInput.value) ? showErrorMessage('userNameError', ERROR_MESSAGES.userName) : hideErrorMessage('userNameError');
  }

  userSurnameInput.oninput = () => {
    if (nameValidator(userSurnameInput.value)) {
      formFields.surname.isValid = true;
      userSurnameInput.classList.remove('invalid');
      hideErrorMessage('userSurnameError');
    } else {
      formFields.surname.isValid = false;
      userSurnameInput.classList.add('invalid');
    }

    checkFormValid();
  }

  userSurnameInput.onblur = () => {
    !nameValidator(userSurnameInput.value) ? showErrorMessage('userSurnameError', ERROR_MESSAGES.userSurname) : hideErrorMessage('userSurnameError');
  }

  emailInput.oninput = () => {
    if (emailValidator(emailInput.value)) {
      formFields.email.isValid = true;
      hideErrorMessage('emailError');
      emailInput.classList.remove('invalid');
    } else {
      formFields.email.isValid = false;
      emailInput.classList.add('invalid');
    }

    checkFormValid();
  }

  emailInput.onblur = () => {
    !emailValidator(emailInput.value) ? showErrorMessage('emailError', ERROR_MESSAGES.email) : hideErrorMessage('emailError');
  }

  password_1.oninput = () => {
    formFields.password_1.isValid = passwordStrengthController(password_1.value);
    checkFormValid();
  }

  password_2.oninput = () => {
    if (formFields.password_1.isValid && (password_1.value === password_2.value)) {
      formFields.password_2.isValid = true;
      hideErrorMessage('passwordsCompareError');
    } else formFields.password_2.isValid = false;

    checkFormValid();
  }

  password_2.onblur = () => {
    password_1.value !== password_2.value ? showErrorMessage('passwordsCompareError', ERROR_MESSAGES.passwordsCompare) : hideErrorMessage('passwordsCompareError');
  }

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every( value => value.isValid);
    isFormValid ? signUpBtn.removeAttribute('disabled') : signUpBtn.setAttribute('disabled', true);
  }

}

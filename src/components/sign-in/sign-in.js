import { signIn, passwordRecovery } from '../../api/api-handlers';
import { passwordLengthValidator, emailValidator } from '../../shared/validators';
import {
  showErrorNotification,
  showErrorMessage,
  hideErrorMessage
} from '../../shared/error-handlers';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

export const signInHandler = () => {
  const signInForm = document.querySelector('.sign-in__form');
  const signInBtn = document.getElementById('signInBtn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const recoverEmailInput = document.getElementById('recoverEmailInput');
  const recoverBtn = document.getElementById('recoverBtn');

  const formFields = {
    email: {
      isValid: false
    },
    password: {
      isValid: false
    }
  }

  signInBtn.setAttribute('disabled', true);
  recoverBtn.setAttribute('disabled', true);

  signInForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    signIn(email, password).catch( error => showErrorNotification(error));
  });

  passwordInput.oninput = () => {
    if (passwordLengthValidator(passwordInput.value)) {
      formFields.password.isValid = true;
      hideErrorMessage('passwordLengthError');
      passwordInput.classList.remove('invalid');
    } else {
      formFields.password.isValid = false;
      passwordInput.classList.add('invalid');
    }

    checkFormValid();
  }


  passwordInput.onblur = () => {
    !passwordLengthValidator(passwordInput.value) ?
      showErrorMessage('passwordLengthError', ERROR_MESSAGES.password_length) :
      hideErrorMessage('passwordLengthError');
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

  recoverEmailInput.oninput = () => {
    if (emailValidator(recoverEmailInput.value)) {
      hideErrorMessage('recoverEmailError');
      recoverEmailInput.classList.remove('invalid');
      recoverBtn.removeAttribute('disabled');
    } else {
      recoverEmailInput.classList.add('invalid');
      recoverBtn.setAttribute('disabled', true);
    }
  }

  recoverEmailInput.onblur = () => {
    !emailValidator(recoverEmailInput.value) ? showErrorMessage('recoverEmailError', ERROR_MESSAGES.email) : hideErrorMessage('recoverEmailError');
  }

  recoverBtn.onclick = () => {
    passwordRecovery(recoverEmailInput.value);
  }

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every( value => value.isValid);
    isFormValid ? signInBtn.removeAttribute('disabled') : signInBtn.setAttribute('disabled', true);
  }
}

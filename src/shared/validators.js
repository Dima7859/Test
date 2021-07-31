import moment from 'moment';

import { REGEXP } from './constants/regexp';
import { PASSWORD_STRENGTHS, VALIDATION_MESSAGES } from '../shared/constants/common';

export const passwordLengthValidator = password => password.match(REGEXP.PASSWORD_LENGTH);

export const emailValidator = email => email.match(REGEXP.EMAIL);

export const nameValidator = userName => userName.match(REGEXP.NAME);

export const birthdateValidator = birth => {
  const currentDate = moment();
  const comparingDate = moment(birth);
  const isAdult = currentDate.diff(comparingDate, 'years', true) >= 18;
  return isAdult;
}

const validation_status = document.querySelector('.sign-up__form-password-strength-status-current');
const validation_info_lowecase = document.querySelector('.sign-up__form-password-strength-status-info-lowercase');
const validation_info_uppercase = document.querySelector('.sign-up__form-password-strength-status-info-uppercase');
const validation_info_numbers = document.querySelector('.sign-up__form-password-strength-status-info-numbers');
const validation_info_characters = document.querySelector('.sign-up__form-password-strength-status-info-characters');


const lowerCaseCheck = password => {
  const result = REGEXP.LOWER_CASE.test(password);
  result ? validation_info_lowecase.style.color = 'blue' : validation_info_lowecase.style.color = 'grey'; 
  validation_info_lowecase.innerText = VALIDATION_MESSAGES.lowercase;

  return REGEXP.LOWER_CASE.test(password);
}

const upperCaseCheck = password => {
  const result = REGEXP.UPPER_CASE.test(password);
  result ? validation_info_uppercase.style.color = 'blue' : validation_info_uppercase.style.color = 'grey'; 
  validation_info_uppercase.innerText = VALIDATION_MESSAGES.uppercase;

  return result;
}

const numberCheck = password => {
  const result = REGEXP.NUMBERS.test(password);
  result ? validation_info_numbers.style.color = 'blue' : validation_info_numbers.style.color = 'grey'; 
  validation_info_numbers.innerText = VALIDATION_MESSAGES.numbers;

  return result;
}

const eightCharactersCheck = password => {
  const result = REGEXP.EIGHT_CHARACTERS.test(password);
  result ? validation_info_characters.style.color = 'blue' : validation_info_characters.style.color = 'grey';
  validation_info_characters.innerText = VALIDATION_MESSAGES.characters; 

  return result;
}

export const passwordStrengthController = password => {
  const filler = document.querySelector('.sign-up__form-password-strength-status-filler');
  const password_strength_block = document.querySelector('.sign-up__form-password-strength');
  let passwordStrength;

  password_strength_block.style.display = 'block';

  const passwordStrengthNum =
    lowerCaseCheck(password) +
    upperCaseCheck(password) +
    numberCheck(password) +
    eightCharactersCheck(password);

  Object.keys(PASSWORD_STRENGTHS).forEach( item => {
    if (PASSWORD_STRENGTHS[item] === passwordStrengthNum) {
      passwordStrength = item;
    }
  });


  switch (passwordStrengthNum) {
    case 1:
      filler.classList.add('weak');
      filler.classList.remove('moderate');
      validation_status.innerText = 'Weak';
      validation_status.className = 'sign-up__form-password-strength-status-current-weak';
      break;
    case 2:
      filler.classList.add('moderate');
      filler.classList.remove('strong');
      validation_status.innerText = 'Moderate';
      validation_status.className = 'sign-up__form-password-strength-status-current-moderate';
      break;
    case 3:
      filler.classList.add('strong');
      filler.classList.remove('veryStrong');
      validation_status.innerText = 'Strong';
      validation_status.className = 'sign-up__form-password-strength-status-current-strong';
      break;
    case 4:
      filler.classList.add('veryStrong');
      validation_status.innerText = 'Complete';
      validation_status.className = 'sign-up__form-password-strength-status-current-complete';
      break;
    default:
      filler.classList.remove('weak');
      break;
  }

  return passwordStrengthNum === 4;

}

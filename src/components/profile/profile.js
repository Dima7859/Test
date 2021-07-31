import { LocalStorageService } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routes';

export const logoutBtnHandler = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.onclick = () => {
    LocalStorageService.clearStorage();
    window.location.href = routes.sign_in;
  };
}

export const openBlockSpinner = () => {
  const body = document.getElementsByTagName('body')[0];
  const modalBlockSpinner = document.createElement('div');
  const spinner = document.createElement('div');
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  const div4 = document.createElement('div');
  const div5 = document.createElement('div');
  const div6 = document.createElement('div');
  const div7 = document.createElement('div');
  const div8 = document.createElement('div');

  modalBlockSpinner.className = 'modalSpinner';
  spinner.className = 'modalSpinner_lds-roller';
  body.append(modalBlockSpinner);
  modalBlockSpinner.append(spinner);
  spinner.append(div1, div2, div3, div4, div5, div6, div7, div8);
};

export const closedBlockSpinner = () => {
  const modalBlockSpinner = document.querySelector('.modalSpinner');
  modalBlockSpinner.remove();
};

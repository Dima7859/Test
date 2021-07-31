export const showErrorMessage = (id, message) => {
  const errorTag = document.getElementById(id);
  errorTag.style.display = 'block';
  errorTag.innerText = message;
}

export const hideErrorMessage = id => {
  const inputErrorTag = document.getElementById(id);
  inputErrorTag.style.display = 'none';
}

export const showErrorNotification = error => {
  const notification = document.createElement('div');
  const body = document.getElementsByTagName('body')[0];
  notification.innerText = error.response ? error.response.data.error.message : error.message;
  notification.className = 'error-notification';
  body.append(notification);
  setTimeout( () => notification.style.display = 'none', 5000);
}

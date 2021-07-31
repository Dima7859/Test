import { renderPosts, postFormHandler } from './dom-handlers/posts-renderer';
import { routes, paths } from './shared/constants/routes';
import { signInHandler } from './components/sign-in/sign-in';
import { LocalStorageService } from './shared/ls-service';
import { logoutBtnHandler } from './components/profile/profile';
import { signUpHandler } from './components/sign-up/sign-up';
import './styles/styles.scss';

window.onload = () => {

  const pathname = Object.values(paths).find( path => path === window.location.pathname );

  switch (pathname) {
    case paths.home:

    const token = LocalStorageService.getToken();

    if (!token) {
      window.location.href = routes.sign_in;
    } else {
      renderPosts();
      postFormHandler();
      logoutBtnHandler();
    }
      break;
    case paths.sign_in:
      signInHandler();
      break;
    case paths.sign_up:
      signUpHandler();
      break;
    default:
      break;
  }

}

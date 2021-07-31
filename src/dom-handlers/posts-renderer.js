import moment from 'moment';

import { getPosts, createPost, getUserById } from '../api/api-handlers';
import { LocalStorageService } from '../shared/ls-service';

export const renderPosts = async () => {

  const postsContainer = document.querySelector('.main-content__posts');
  let posts;
  let users = 

  postsContainer.innerHTML = null;

  await getPosts().then ( response => posts = response);

  posts.forEach( async post => {
    let user;
    const postBlock = document.createElement('div');
    const title = document.createElement('h5');
    const content = document.createElement('p');
    const userName = document.createElement('span');
    const postDate = document.createElement('span');

    postBlock.className = 'main-content__posts-post';
    title.className = 'main-content__posts-post-title';
    content.className = 'main-content__posts-post-content';
    userName.className = 'main-content__posts-post-bottom-info';
    postDate.className = 'main-content__posts-post-bottom-info';
    
    await getUserById(post.userId).then( response => user = response);

    title.innerHTML = posts.title;
    content.innerHTML = posts.content;
    userName.innerHTML = `${user.firstName} ${user.lastName} `;
    postDate.innerHTML = moment(posts.date).format('MMM Do YY');

    postBlock.append(title, content, userName, postDate);
    postsContainer.append(postBlock);
  })
}

export const postFormHandler = () => {
  const post_form = document.getElementById('post_form');
  const title_input = document.getElementById('title_input');
  const post_content = document.getElementById('post_content');

  const post = {
    userId: LocalStorageService.getPersonalData().key,
    date: moment().format(),
    title: null,
    content: null
  };

  post_form.addEventListener('submit', event => {
    event.preventDefault();
    post.title = title_input.value;
    post.content = post_content.value;
    createPost(post)
      .then( () => renderPosts());
    title_input.value = null;
    post_content.value = null;
  });

}

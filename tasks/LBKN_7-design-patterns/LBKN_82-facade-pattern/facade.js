async function getData(url, params = {}) {
  let queryString = '';
    for (let param in params) {
      queryString += `${param}=${params[param]}&`
    }
  try {
    const res = await fetch(`${url}?${queryString}`);
    return await res.json();
  } catch (error) {
    console.log('Error: ', error);
  }
}
async function getPosts() {
  const posts = await getData('https://jsonplaceholder.typicode.com/posts', {
    userId: 10,
  });
  console.log('posts: ', posts);
}

async function getTodo() {
  const todos = await getData('https://jsonplaceholder.typicode.com/todos/10');
  console.log('todos: ', todos);
}

async function getPhoto() {
  const photo = await getData(
    'https://jsonplaceholder.typicode.com/photos/10'
  );
  console.log('photos: ', photo);
}

async function getAlbum() {
  const album = await getData(
    'https://jsonplaceholder.typicode.com/albums/10'
  );
  console.log('album: ', album);
}

getPosts();
getTodo();
getPhoto();
getAlbum();

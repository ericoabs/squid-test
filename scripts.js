document.addEventListener("DOMContentLoaded", function () {
  // Código que será executado quando o navegador carregar
  const app = document.getElementById('root');

  const container = document.createElement('div');
  container.setAttribute('class', 'container');

  app.appendChild(container);

  const row = document.createElement('div');
  row.setAttribute('class', 'row');

  container.appendChild(row);

  (async function dataFecth() {
    await fetch('https://us-central1-squid-apis.cloudfunctions.net/test-front-basic')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Request error');
        }
      })
      .then((data) => {
        data.map((item) => {
          const image = document.createElement('img');
          image.setAttribute('src', item.imagens.thumbnail.url);
          
          const overlay = document.createElement('div');
          overlay.setAttribute('class', 'overlay');
          
          const userName = document.createElement('div');
          userName.setAttribute('class', 'username');
          userName.innerHTML += '@' + item.usuario.username;

          const likes = document.createElement('div');
          likes.setAttribute('class', 'likes');
          likes.innerHTML += item.upvotes;
          
          const likesIcon = document.createElement('i');
          likesIcon.setAttribute('class', 'fas fa-heart');
          
          likes.appendChild(likesIcon);
          
          overlay.appendChild(likes);
          
          overlay.appendChild(userName);

          const upvotes = document.createElement('div');
          upvotes.setAttribute('class', 'text');
          upvotes.innerHTML += '@' + item.usuario.username;
          
          
          const anchor = document.createElement('a');
          anchor.setAttribute('href', item.link);
          anchor.setAttribute('class', 'overlayContainer');

          anchor.appendChild(image);
          anchor.appendChild(overlay);

          const col = document.createElement('div');
          col.setAttribute('class', 'col');

          col.appendChild(anchor);

          row.appendChild(col);
        });
      })
      .catch(err => {
        console.log(err);
      })
  })();
});
document.addEventListener("DOMContentLoaded", function () {
  // Código que será executado quando o navegador carregar
  const app = document.getElementById('root');

  const container = document.createElement('div');
  container.setAttribute('class', 'container');

  app.appendChild(container);

  const row = document.createElement('div');
  row.setAttribute('class', 'row');

  container.appendChild(row);

  function formattedDate(data) {
    const [date, time] = new Date(data).toLocaleString().split(' ');
    const [hour, minute] = time.split(':');
    return `${date} ${hour}:${minute}`;
  };
  
  (async function dataFetch() {
    await fetch('https://us-central1-squid-apis.cloudfunctions.net/test-front-basic')
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Request error');
        }
        return response.json();
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

          const likeContainer = document.createElement('div');
          likeContainer.setAttribute('class', 'likeContainer');

          likeContainer.appendChild(likesIcon);
          likeContainer.appendChild(likes);

          const comments = document.createElement('div');
          comments.setAttribute('class', 'comments');
          comments.innerHTML += item.comentarios;

          const commentsIcon = document.createElement('i');
          commentsIcon.setAttribute('class', 'fas fa-comment');

          const commentsContainer = document.createElement('div');
          commentsContainer.setAttribute('class', 'commentsContainer');

          commentsContainer.appendChild(commentsIcon);
          commentsContainer.appendChild(comments);

          const createdAt = document.createElement('div');
          createdAt.setAttribute('class', 'createdAt');
          createdAt.innerHTML += formattedDate(item.criadoEm);

          const createdAticon = document.createElement('i');
          createdAticon.setAttribute('class', 'fas fa-calendar-week');

          const createdAtContainer = document.createElement('div');
          createdAtContainer.setAttribute('class', 'createdAtContainer');

          createdAtContainer.appendChild(createdAticon);
          createdAtContainer.appendChild(createdAt);

          overlay.appendChild(userName);

          overlay.appendChild(likeContainer);

          overlay.appendChild(commentsContainer);

          overlay.appendChild(createdAtContainer);

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
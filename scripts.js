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
          // const col = document.createElement('div');
          // col.setAttribute('class', 'col');

          // row.appendChild(col);

          const image = document.createElement('img');
          image.setAttribute('src', item.imagens.resolucaoMedia.url);

          const anchor = document.createElement('a');
          anchor.setAttribute('href', item.link);

          anchor.appendChild(image);

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
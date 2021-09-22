document.addEventListener("DOMContentLoaded", function() {
  // Código que será executado quando o navegador carregar
  const app = document.getElementById('root');

  const container = document.createElement('div');
  container.setAttribute('class', 'container');

  app.appendChild(container);

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
        console.log(data);        
      })
      .catch(err => {
        console.log(err);
      })
  })();
});
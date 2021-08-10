import { html, render } from "https://unpkg.com/lit-html?module";

render(
  html`


    <div class="form__group field">
  <input @keyup=${(e) => {
      if (e.keyCode === 13) {
        fetchData(e.target.value);
      }
    }} type="input" class="form__field" placeholder="Search for News" name="name" id='name' required />
  <label for="name" class="form__label">News</label>
</div>
<div id="root"></div>
`,
  document.body
);

const fetchData = (name) => {
  fetch(
    `https://newsapi.org/v2/everything?q=${name}&sortBy=popularity&apiKey=${apiKey||""}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      render(
        html`
          <div>
            <ul class="cards">
              ${data.articles.map(
                (article) => html`
                  <li class="cards_item">
                    <div class="card">
                      <div class="card_image">
                        <img src="${article.urlToImage}" />
                      </div>
                      <div class="card_content">
                        <h2 class="card_title">${article.title}</h2>
                        <hr />
                        <span class="card_source"
                          >${article.author}@${article.source.name}</span
                        >
                        ${article.publishedAt}
                        <br />
                        <p class="card_text">${article.description}</p>
                        <button
                          class="btn card_btn"
                          @click=${(e) => {
                            window.location.href = article.url;
                          }}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </li>
                `
              )}
            </ul>
          </div>
        `,
        document.getElementById("root")
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchData = (fn) => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      fn(json);
      render(fn(json), document.body);
    });
};
import { html, render } from "https://unpkg.com/lit-html?module";

const renderHTML = (json) => {
  return html`
    <input
      type="text"
      style="width:50vw;"
      placeholder="Search for a post..."
      @keyup=${(e) => {
        let postMase = [];
        for (let i of json) {
          console.log(i.title.includes(e.target.value));
          if (i.title.includes(e.target.value)) {
            postMase.push(html`
              <div style="width:220px">
                <h3>${i.title}</h3>
                <p>${i.body}</p>
              </div>
            `);
          }
        }
        render(postMase, document.getElementById("map"));
      }}
    />
    <hr />
    <div
      id="map"
      style="display:grid; grid-template-columns: auto auto auto auto;"
    >
      ${json.map((item) => {
          
        return html`
          <div style="width:220px">
            <h2
              style="text-align:center;text-overflow: ellipsis;white-space: nowrap;overflow: hidden; grid-auto-columns: 50px;"
            >
              ${item.title}
            </h2>
            <p>${item.body}</p>
          </div>
        `;
      })}
    </div>
  `;
};

fetchData(renderHTML);

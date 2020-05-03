export default class Card {
  constructor({ text, title, url }) {
    this.text = text;
    this.title = title;
    this.url = url;
  }

  render() {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
    <li>
    <img src="${this.url}" class="card-img-top" alt="${this.title}"/>
    <div class="card-body">
    <h5 class="card-title">${this.title}</h5>
    <p class="card-text">${this.text}</p>
    </div>
    </li>
    `;

    return card;
  }
}

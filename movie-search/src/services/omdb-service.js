export default class OMDbService {
  constructor() {
    this.apiBase = 'https://www.omdbapi.com';
    this.apiKey = '4a3b711b';
  }

  async getResourceById(term) {
    const res = await fetch(`${this.apiBase}/?apikey=${this.apiKey}&i=${term}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${term}, received ${res.status}`);
    }

    const body = await res.json();

    return body;
  }

  async getResourceBySearch(term, page = 1) {
    let url = `${this.apiBase}/?apikey=${this.apiKey}&s=${term}`;
    if (page > 1) url += `&page=${page}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${term}, received ${res.status}`);
    }

    const body = await res.json();

    return body;
  }
}

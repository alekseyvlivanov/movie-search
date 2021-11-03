export default class OMDbService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.apiKeys = data.apiKeys;
  }

  async getResourceById(term) {
    const res = await fetch(
      encodeURI(
        `${this.apiBase}/?apikey=${
          this.apiKeys[Math.round(Math.random())]
        }&i=${term}`,
      ),
    );

    if (!res.ok) {
      throw new Error(`Could not fetch ${term}, received ${res.status}`);
    }

    const body = await res.json();

    return body;
  }

  async getResourceBySearch(term, page = 1) {
    let url = `${this.apiBase}/?apikey=${
      this.apiKeys[Math.round(Math.random())]
    }&s=${term}`;
    if (page > 1) url += `&page=${page}`;

    const res = await fetch(encodeURI(url));

    if (!res.ok) {
      throw new Error(`Could not fetch ${term}, received ${res.status}`);
    }

    const body = await res.json();

    return body;
  }
}

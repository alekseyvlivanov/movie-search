export default class TranslateService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.apiKey = data.apiKey;
    this.ruRegExp = /[А-Яа-я]+/g;
  }

  async translate(term) {
    if (this.ruRegExp.test(term)) {
      const res = await fetch(
        encodeURI(
          `${this.apiBase}/translate?key=${this.apiKey}&text=${term}&lang=ru-en`,
        ),
      );

      if (!res.ok) {
        throw new Error(`Could not fetch ${term}, received ${res.status}`);
      }

      const body = await res.json();

      return body.text[0];
    }

    // window.console.log('no russian detected:', term);

    return term;
  }
}

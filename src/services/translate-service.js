export default class TranslateService {
  constructor(data, useCorsProxy = true) {
    this.apiBase = data.apiBase;
    this.corsProxy = useCorsProxy ? 'https://cors-anywhere.herokuapp.com/' : '';
    this.ruRegExp = /[А-Яа-я]+/g;
  }

  async translate(term) {
    if (this.ruRegExp.test(term)) {
      const res = await fetch(
        encodeURI(
          `${this.corsProxy}${this.apiBase}/translate?source_text=${term}&to_language=en&from_language=ru`,
        ),
      );

      if (!res.ok) {
        throw new Error(`Could not fetch ${term}, received ${res.status}`);
      }

      const body = await res.json();

      return body.translated_text;
    }

    // window.console.log('no russian detected:', term);

    return term;
  }
}

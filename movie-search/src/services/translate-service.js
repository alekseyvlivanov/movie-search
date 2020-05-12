export default class TranslateService {
  constructor() {
    this.apiBase = 'https://translate.yandex.net/api/v1.5/tr.json';
    this.apiKey =
      'trnsl.1.1.20200509T161541Z.bad99bebb7e002e7.dea9956eed43cfc34a8158a12fab46611314a3ac';
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

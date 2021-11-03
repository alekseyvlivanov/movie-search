import App from './components/app';

import MainService from './services/main-service';

const initialSearch = 'Doc Martin';

document.getElementById('root').append(App.render(initialSearch));

const mainService = new MainService(initialSearch);
mainService.addListeners();

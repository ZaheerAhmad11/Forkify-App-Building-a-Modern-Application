import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultsView extends View {
  _parenElement = document.querySelector('.results');
  _errormessage = `No Recipes Found for your query! Please try again;) `;
  _message = '';

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join('');
  }
}
export default new ResultsView();

import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parenElement = document.querySelector('.bookmarks__list');
  _errormessage = `No bookmarks yet. Find a nice recipe and bookmark it :) `;
  _message = '';

  addHandlerRender (handler) {
    window.addEventListener('load', handler)
  }

  _generateMarkup() {
    return this._data
      .map(booknark => previewView.render(booknark, false))
      .join('');
  }
}
export default new BookmarksView();

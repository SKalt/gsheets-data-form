import {createStore, combineReducers} from 'redux';

const linkToId = (link) => link
  .replace(/.*\/d\//, '')
  .replace(/\/edit.+/, '');

// poll for window closing
function pollWindow(url, cb){
  let tab = window.open(url);
  const checkOpen = () => setTimeout(()=> tab.closed ? cb() : checkOpen(), 500);
  checkOpen();
}

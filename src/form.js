// import {createStore, combineReducers} from 'redux';
import {formatUrl} from './url-formatter.js';

const linkToId = (link) => link.replace(/.*\/d\//, '')
  .replace(/\/edit.+/, '');

const get = {
  _:(id)=>document.getElementById(id),
  all: (selector)=>document.querySelectorAll(selector),
  valueOf: (id)=>get._(id).value,
  key: ()=>get.valueOf('api-key-form'),
  sheetId: ()=>linkToId(get.valueOf('ID')),
  link: ()=>get.valueOf('fetch-link'),
  range: ()=>get.valueOf('range')
};

const test = {
  link: ()=>{
    fetch(get.link()).then(response => {
      if (response.ok){
        return response.json();
      }
      return response.text();
    }).catch(err => err.message)
      .then(content => document.getElementById('test').textContent = content);
  }
};

const makeLink = () => {
  let params = {
    key: get.key(),
    sheetId: get.sheetId(),
    range: get.range()
  };
  let url = formatUrl(params);
  document.getElementById('fetch-link').value = url;
};

const copyLink = () => {
  document.getElementById('fetch-link').select();
  document.execCommand('copy');
};
const toggle = (el) =>{
  el.css.display = el.css.display ? '' : 'none';
};
// poll for window closing
function pollWindow(url, cb){
  let tab = window.open(url);
  const checkOpen = () => setTimeout(()=> tab.closed ? cb() : checkOpen(), 500);
  checkOpen();
}

window.addEventListener('load', function() {
  get._('api-key-link').addEventListener('click', () => {
    get._('api-key-input').focus();
  });
  get._('make-link').addEventListener('click', makeLink);
  get._('test-link').addEventListener('click', test.link);
  get.all('section > h4').forEach(el =>{
    el.addEventListener('click', () => toggle(el.nexElementSibling));
  });
});

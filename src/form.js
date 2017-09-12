// import {createStore, combineReducers} from 'redux';
import {formatUrl} from './url-formatter.js';

const linkToId = (link) => link.replace(/.*\/d\//, '')
  .replace(/\/edit.+/, '');

const get = {
  _:(id)=>document.getElementById(id),
  all: (selector)=>document.querySelectorAll(selector),
  valueOf: (id)=>get._(id).value.trim(),
  key: ()=>get.valueOf('api-key-form'),
  sheetId: ()=>linkToId(get.valueOf('ID')),
  link: ()=>get.valueOf('fetch-link'),
  range: ()=>get.valueOf('range')
};

const test = {
  link: ()=>{
    fetch(get.link()).then(response => {
      if (response.ok){
        return response.text();
      }
      return response.text();
    }).catch(err => err.message)
      .then(content => document.getElementById('test').textContent = content);
  }
};

const makeLink = () => {
  const scrollTo = (id, msg) =>{
    let el = get._(id);
    el.scrollIntoView();
    el.focus();
    msg && alert(msg);
    throw new Error(msg);
  };
  let key = encodeURIComponent(get.key());
  let sheetId = get.sheetId();
  let range = encodeURIComponent(get.range());
  if (!key) scrollTo('api-key-form', 'api key missing');
  if (!sheetId) scrollTo('ID', 'sheet ID missing');
  if (!range) scrollTo('range', 'range missing');
  let url = formatUrl({key, sheetId, range});
  document.getElementById('fetch-link').value = url;
};

const copyLink = () => {
  document.getElementById('fetch-link').select();
  document.execCommand('copy');
};
const toggle = (el) =>{
  el.style.display = el.style.display ? '' : 'none';
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
  get.all('section h2').forEach(el =>{
    el.addEventListener('click', function(){
      toggle(this.nextElementSibling);
    });
  });
});

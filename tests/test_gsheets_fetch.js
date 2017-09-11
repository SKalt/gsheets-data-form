const mocha = require('mocha');
const fs = require('fs');
const key = fs.readFileSync('../api_key.txt', {'encoding': 'utf8'});
const sheetId = fs.readFileSync('../sheet_id.txt', {'encoding': 'utf8'});
const fetch = require('node-fetch');
const formatUrl = require('../src/url-formatter.js');

describe('attempted fetch', function(){
  it('works', function(){
    fetch(formatUrl({key, sheetId, range:'sheet1!A1:B2'}))
      .then(response => assert(response.ok));
  })
})

/**
 * Returns an array of arrays with keys described in
 * @param  {Object|Array} json   [description]
 * @param  {[type]} header [description]
 * @return {[type]}        [description]
 */
export function process(json, header) {
  const values = Array.isArray(json) ? json : json.values;
  if (!values) throw new Error('no values supplied:' + JSON.stringify(json));
  header = (!header && header !== 0) ? [] : header; // may still be an integer
  if (Number.isInteger(header)){
     header = values[header]; // now must be Array
     values[header] =
  return values.map(
    row => {
      let _row = [];
      row.forEach((cell, index) => _row[header[index] || index]);
      return _row;
    }
  );
}

/**
 * Gets google sheet data as an array of arrays.
 * @param  {String} URL  a URL to a google sheet to fetch. Must include api key and an A1-notation-encoded range.
 * @param  {String[]|integer|undefined} header an integer >= 0 indicating an array of column names or the array itself, or undefined, indicating no such array is present.
 * @return {Array[]} an array of arrays of cell values.
 */
export function getJson(URL, header){
  return fetch(URL).then(response => {
    if (response.ok){
      return response.json();
    }
    throw new Error('Response is not ok: status ' + response.status);
  }).then(json => process(json, header));
}

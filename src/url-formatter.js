const stringify = require('querystring').stringify;
/**
 * dateTimeRenderOption majorDimension valueRenderOption prettyPrint upload_protocol uploadType $.xgafv
callback alt pp
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
module.exports = function formatUrl(params){
  let {sheetId, range} = params;
  delete params.sheetId;
  delete params.range;
  params = stringify(params);
  return 'https://sheets.googleapis.com/v4/spreadsheets/' +
    `${sheetId}/values/${range}?${params}`;
};

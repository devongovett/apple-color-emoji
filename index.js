var path = require('path');

exports.imageDir = path.join(__dirname, 'images');
exports.basePath = exports.imageDir;
exports.regex = require('./regex');

// Detect native browser support for emoji
exports.nativeSupport = (function() {
  if (typeof document === 'undefined')
    return false;

  var canvas = document.createElement('canvas');
  if (!canvas.getContext)
    return false;

  var ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '32px sans-serif';
  ctx.fillText('😃', 0, 0);

  return ctx.getImageData(16, 16, 1, 1).data[0] !== 0;
})();

function getImage(str) {
  // strip unicode variation selectors
  str = str.replace(/[\ufe00-\ufe0f\u200d]/g, '');

  var name = [];
  for (var i = 0; i < str.length; i++)
    name.push(('0000' + str.charCodeAt(i).toString(16)).slice(-4));

  return exports.basePath.replace(/\/$/, '') + '/' + name.join('-') + '.png';
}

// make a regex to test whether an entire string is an emoji
var testRegex = new RegExp('^(' + exports.regex.toString().slice(1, -2) + ')$');

// Get the image path for the given emoji string
exports.getImage = function(chars) {
  if (!testRegex.test(chars))
    return null;

  return getImage(chars);
};

// Replaces occurrences of emoji in the string with <img> tags
// if there is no native support for emoji in the current environment
exports.replace = function(string) {
  string = '' + string;
  if (exports.nativeSupport)
    return string;

  return string.replace(exports.regex, function(c) {
    return '<img class="emoji" src="' + getImage(c) + '" alt="' + c + '">';
  });
};

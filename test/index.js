var emoji = require('../');
var assert = require('assert');

describe('apple-color-emoji', function() {
  it('should have some properties', function() {
    assert.equal(typeof emoji.imageDir, 'string');
    assert.equal(typeof emoji.basePath, 'string');
    assert.ok(emoji.regex instanceof RegExp);
  });
  
  it('should replace a string with <img> tags', function() {
    assert.equal(emoji.replace('this is an 🍎'), 'this is an <img class="emoji" src="' + emoji.basePath + '/d83c-df4e.png" alt="🍎">');
  });
  
  it('should not replace if there is native support', function() {
    emoji.nativeSupport = true;
    assert.equal(emoji.replace('this is an 🍎'), 'this is an 🍎');
    emoji.nativeSupport = false;
  });
  
  it('should get an image', function() {
    assert.equal(emoji.getImage('😀'), emoji.basePath + '/d83d-de00.png');
  });
});

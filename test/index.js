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

  it('should support flag glyphs', function() {
    assert.equal(emoji.getImage('🇺🇸'), emoji.basePath + '/d83c-ddfa-d83c-ddf8.png');
    assert.equal(emoji.getImage('🇦🇽'), emoji.basePath + '/d83c-dde6-d83c-ddfd.png');
  });

  it('should support skin tone modifiers', function() {
    assert.equal(emoji.getImage('👍'), emoji.basePath + '/d83d-dc4d.png');
    assert.equal(emoji.getImage('👍🏻'), emoji.basePath + '/d83d-dc4d-d83c-dffb.png');
    assert.equal(emoji.getImage('👍🏼'), emoji.basePath + '/d83d-dc4d-d83c-dffc.png');
    assert.equal(emoji.getImage('👍🏽'), emoji.basePath + '/d83d-dc4d-d83c-dffd.png');
    assert.equal(emoji.getImage('👍🏾'), emoji.basePath + '/d83d-dc4d-d83c-dffe.png');
    assert.equal(emoji.getImage('👍🏿'), emoji.basePath + '/d83d-dc4d-d83c-dfff.png');
  });

  it("should support female modifers", function() {
    assert.equal(emoji.getImage('🏃'), emoji.basePath + '/d83c-dfc3.png');
    assert.equal(emoji.getImage('🏃‍♀️'), emoji.basePath + '/d83c-dfc3-2640.png');
  });

  it("should support female + skin tone modifiers", function() {
    assert.equal(emoji.getImage('🏃‍♀️'), emoji.basePath + '/d83c-dfc3-2640.png');
    assert.equal(emoji.getImage('🏃🏻‍♀️'), emoji.basePath + '/d83c-dfc3-d83c-dffb-2640.png');
    assert.equal(emoji.getImage('🏃🏼‍♀️'), emoji.basePath + '/d83c-dfc3-d83c-dffc-2640.png');
    assert.equal(emoji.getImage('🏃🏽‍♀️'), emoji.basePath + '/d83c-dfc3-d83c-dffd-2640.png');
    assert.equal(emoji.getImage('🏃🏾‍♀️'), emoji.basePath + '/d83c-dfc3-d83c-dffe-2640.png');
    assert.equal(emoji.getImage('🏃🏿‍♀️'), emoji.basePath + '/d83c-dfc3-d83c-dfff-2640.png');
  });
});

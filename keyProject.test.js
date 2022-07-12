const assert = require("assert").strict;

const { KeyOperations } = require("./keysProject");

let keyOps = new KeyOperations()
describe("All test cases of KeyStore", function () {

  it("addKeyValue: after adding value should be found in get method", function (done) {
    keyOps.addKeyValue('test',{'value':1})
    let {value} = keyOps.getKey('test')
    assert.equal(value, 1);
    done();
  });

  it("getKey: should retrun data if value found", function (done) {
    keyOps.addKeyValue('test',{'value':10})
    let {value} = keyOps.getKey('test')
    assert.equal(value, 10);
    done();
  });

  it("getKey: should Not be able to add keywith diffrent type", function (done) {
    keyOps.addKeyValue('test1',{'value':true})
    let value = keyOps.getKey('test1')
    assert.equal(value, undefined);
    done();
  });

  it("deleteKey: key should be undefined after delete", function (done) {
    keyOps.deletekey('test')
    
    assert.equal(keyOps.getKey('test'), undefined);
    done();
  });

  it("stretch: should be able to give result if element found", function (done) {
    keyOps.addKeyValue('crocin',{'category':'Cold n Flu','manufacturer':'GSK'})
    assert.equal(keyOps.stretch('manufacturer','GSK')[0],'crocin', true);
    done();
  });
});
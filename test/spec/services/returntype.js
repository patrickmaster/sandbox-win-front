'use strict';

describe('Service: returntype', function () {

  // load the service's module
  beforeEach(module('sandboxApp'));

  // instantiate service
  var returntype;
  beforeEach(inject(function (_returntype_) {
    returntype = _returntype_;
  }));

  it('should do something', function () {
    expect(!!returntype).toBe(true);
  });

});

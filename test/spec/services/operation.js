'use strict';

describe('Service: operation', function () {

  // load the service's module
  beforeEach(module('sandboxApp'));

  // instantiate service
  var operation;
  beforeEach(inject(function (_operation_) {
    operation = _operation_;
  }));

  it('should do something', function () {
    expect(!!operation).toBe(true);
  });

});

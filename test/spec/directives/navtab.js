'use strict';

describe('Directive: navTab', function () {

  // load the directive's module
  beforeEach(module('sandboxApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<nav-tab></nav-tab>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the activeTab directive');
  }));
});

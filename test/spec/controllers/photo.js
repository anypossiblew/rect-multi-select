'use strict';

describe('Controller: PhotoctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('rectMultiSelectApp'));

  var PhotoctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PhotoctrlCtrl = $controller('PhotoctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

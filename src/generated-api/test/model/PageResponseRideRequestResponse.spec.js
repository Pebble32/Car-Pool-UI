/**
 * CarPool API
 * API documentation for CarPool application
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.CarPoolApi);
  }
}(this, function(expect, CarPoolApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new CarPoolApi.PageResponseRideRequestResponse();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('PageResponseRideRequestResponse', function() {
    it('should create an instance of PageResponseRideRequestResponse', function() {
      // uncomment below and update the code to test PageResponseRideRequestResponse
      //var instance = new CarPoolApi.PageResponseRideRequestResponse();
      //expect(instance).to.be.a(CarPoolApi.PageResponseRideRequestResponse);
    });

    it('should have the property content (base name: "content")', function() {
      // uncomment below and update the code to test the property content
      //var instance = new CarPoolApi.PageResponseRideRequestResponse();
      //expect(instance).to.be();
    });

    it('should have the property number (base name: "number")', function() {
      // uncomment below and update the code to test the property number
      //var instance = new CarPoolApi.PageResponseRideRequestResponse();
      //expect(instance).to.be();
    });

    it('should have the property size (base name: "size")', function() {
      // uncomment below and update the code to test the property size
      //var instance = new CarPoolApi.PageResponseRideRequestResponse();
      //expect(instance).to.be();
    });

    it('should have the property totalElements (base name: "totalElements")', function() {
      // uncomment below and update the code to test the property totalElements
      //var instance = new CarPoolApi.PageResponseRideRequestResponse();
      //expect(instance).to.be();
    });

    it('should have the property totalPages (base name: "totalPages")', function() {
      // uncomment below and update the code to test the property totalPages
      //var instance = new CarPoolApi.PageResponseRideRequestResponse();
      //expect(instance).to.be();
    });

    it('should have the property first (base name: "first")', function() {
      // uncomment below and update the code to test the property first
      //var instance = new CarPoolApi.PageResponseRideRequestResponse();
      //expect(instance).to.be();
    });

    it('should have the property last (base name: "last")', function() {
      // uncomment below and update the code to test the property last
      //var instance = new CarPoolApi.PageResponseRideRequestResponse();
      //expect(instance).to.be();
    });

  });

}));

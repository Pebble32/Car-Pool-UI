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

import ApiClient from '../ApiClient';

/**
 * The AuthenticationRequest model module.
 * @module model/AuthenticationRequest
 * @version 1.0
 */
class AuthenticationRequest {
    /**
     * Constructs a new <code>AuthenticationRequest</code>.
     * @alias module:model/AuthenticationRequest
     * @param email {String} 
     * @param password {String} 
     */
    constructor(email, password) { 
        
        AuthenticationRequest.initialize(this, email, password);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, email, password) { 
        obj['email'] = email;
        obj['password'] = password;
    }

    /**
     * Constructs a <code>AuthenticationRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AuthenticationRequest} obj Optional instance to populate.
     * @return {module:model/AuthenticationRequest} The populated <code>AuthenticationRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AuthenticationRequest();

            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AuthenticationRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthenticationRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of AuthenticationRequest.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
            throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
        }
        // ensure the json data is a string
        if (data['password'] && !(typeof data['password'] === 'string' || data['password'] instanceof String)) {
            throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + data['password']);
        }

        return true;
    }


}

AuthenticationRequest.RequiredProperties = ["email", "password"];

/**
 * @member {String} email
 */
AuthenticationRequest.prototype['email'] = undefined;

/**
 * @member {String} password
 */
AuthenticationRequest.prototype['password'] = undefined;






export default AuthenticationRequest;


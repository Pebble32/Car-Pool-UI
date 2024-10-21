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
 * The RideRequestRequest model module.
 * @module model/RideRequestRequest
 * @version 1.0
 */
class RideRequestRequest {
    /**
     * Constructs a new <code>RideRequestRequest</code>.
     * @alias module:model/RideRequestRequest
     * @param rideOfferId {Number} 
     */
    constructor(rideOfferId) { 
        
        RideRequestRequest.initialize(this, rideOfferId);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, rideOfferId) { 
        obj['rideOfferId'] = rideOfferId;
    }

    /**
     * Constructs a <code>RideRequestRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RideRequestRequest} obj Optional instance to populate.
     * @return {module:model/RideRequestRequest} The populated <code>RideRequestRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RideRequestRequest();

            if (data.hasOwnProperty('rideOfferId')) {
                obj['rideOfferId'] = ApiClient.convertToType(data['rideOfferId'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>RideRequestRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>RideRequestRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of RideRequestRequest.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }

        return true;
    }


}

RideRequestRequest.RequiredProperties = ["rideOfferId"];

/**
 * @member {Number} rideOfferId
 */
RideRequestRequest.prototype['rideOfferId'] = undefined;






export default RideRequestRequest;


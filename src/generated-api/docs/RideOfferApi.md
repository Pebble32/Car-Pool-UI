# CarPoolApi.RideOfferApi

All URIs are relative to *process.env.REACT_APP_BACKEND_URL*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createRideOffer**](RideOfferApi.md#createRideOffer) | **POST** /offers/create | 
[**deleteRideOffer**](RideOfferApi.md#deleteRideOffer) | **DELETE** /offers/details/{id} | 
[**deleteRideOfferFinished**](RideOfferApi.md#deleteRideOfferFinished) | **DELETE** /offers/delete-finished | 
[**editRideOfferDetails**](RideOfferApi.md#editRideOfferDetails) | **PUT** /offers/details | 
[**filterRideOffers**](RideOfferApi.md#filterRideOffers) | **GET** /offers/filter | 
[**findAllRideOffers**](RideOfferApi.md#findAllRideOffers) | **GET** /offers/all | 
[**findAllRideOffersPaginated**](RideOfferApi.md#findAllRideOffersPaginated) | **GET** /offers/all/paginated | 
[**markRideAsFinished**](RideOfferApi.md#markRideAsFinished) | **PUT** /offers/mark-finished/{id} | 
[**searchForRides**](RideOfferApi.md#searchForRides) | **GET** /offers/search | 
[**showAllProviders**](RideOfferApi.md#showAllProviders) | **GET** /offers/all/providers | 
[**viewRideOfferDetails**](RideOfferApi.md#viewRideOfferDetails) | **GET** /offers/details | 



## createRideOffer

> Number createRideOffer(rideOfferRequest)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
let rideOfferRequest = new CarPoolApi.RideOfferRequest(); // RideOfferRequest | 
apiInstance.createRideOffer(rideOfferRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **rideOfferRequest** | [**RideOfferRequest**](RideOfferRequest.md)|  | 

### Return type

**Number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteRideOffer

> deleteRideOffer(id)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
let id = 789; // Number | 
apiInstance.deleteRideOffer(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## deleteRideOfferFinished

> deleteRideOfferFinished()



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
apiInstance.deleteRideOfferFinished((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## editRideOfferDetails

> RideOfferResponse editRideOfferDetails(editRideOfferRequest)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
let editRideOfferRequest = new CarPoolApi.EditRideOfferRequest(); // EditRideOfferRequest | 
apiInstance.editRideOfferDetails(editRideOfferRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **editRideOfferRequest** | [**EditRideOfferRequest**](EditRideOfferRequest.md)|  | 

### Return type

[**RideOfferResponse**](RideOfferResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## filterRideOffers

> PageResponseRideOfferResponse filterRideOffers(opts)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
let opts = {
  'page': 0, // Number | 
  'size': 10, // Number | 
  'startLocation': "startLocation_example", // String | 
  'endLocation': "endLocation_example", // String | 
  'departureTime': new Date("2013-10-20T19:20:30+01:00") // Date | 
};
apiInstance.filterRideOffers(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] [default to 0]
 **size** | **Number**|  | [optional] [default to 10]
 **startLocation** | **String**|  | [optional] 
 **endLocation** | **String**|  | [optional] 
 **departureTime** | **Date**|  | [optional] 

### Return type

[**PageResponseRideOfferResponse**](PageResponseRideOfferResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## findAllRideOffers

> [RideOfferResponse] findAllRideOffers()



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
apiInstance.findAllRideOffers((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[RideOfferResponse]**](RideOfferResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## findAllRideOffersPaginated

> PageResponseRideOfferResponse findAllRideOffersPaginated(opts)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
let opts = {
  'page': 0, // Number | 
  'size': 10 // Number | 
};
apiInstance.findAllRideOffersPaginated(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] [default to 0]
 **size** | **Number**|  | [optional] [default to 10]

### Return type

[**PageResponseRideOfferResponse**](PageResponseRideOfferResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## markRideAsFinished

> String markRideAsFinished(id)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
let id = 789; // Number | 
apiInstance.markRideAsFinished(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## searchForRides

> PageResponseRideOfferResponse searchForRides(keyword, opts)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
let keyword = "keyword_example"; // String | 
let opts = {
  'page': 0, // Number | 
  'size': 10 // Number | 
};
apiInstance.searchForRides(keyword, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **keyword** | **String**|  | 
 **page** | **Number**|  | [optional] [default to 0]
 **size** | **Number**|  | [optional] [default to 10]

### Return type

[**PageResponseRideOfferResponse**](PageResponseRideOfferResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## showAllProviders

> [UserResponse] showAllProviders()



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
apiInstance.showAllProviders((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[UserResponse]**](UserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## viewRideOfferDetails

> RideOfferResponse viewRideOfferDetails(ID)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideOfferApi();
let ID = 789; // Number | 
apiInstance.viewRideOfferDetails(ID, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ID** | **Number**|  | 

### Return type

[**RideOfferResponse**](RideOfferResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


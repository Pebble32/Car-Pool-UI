# CarPoolApi.RideRequestApi

All URIs are relative to *process.env.REACT_APP_BACKEND_URL*

Method | HTTP request | Description
------------- | ------------- | -------------
[**answerRideOffer**](RideRequestApi.md#answerRideOffer) | **PUT** /ride-requests/answer | 
[**createRideRequest**](RideRequestApi.md#createRideRequest) | **POST** /ride-requests/create | 
[**deleteRideRequest**](RideRequestApi.md#deleteRideRequest) | **DELETE** /ride-requests/delete-request/{id} | 
[**getRideOffers**](RideRequestApi.md#getRideOffers) | **GET** /ride-requests/requests | 
[**getRideRequestsForRideOfferPaginated**](RideRequestApi.md#getRideRequestsForRideOfferPaginated) | **GET** /ride-requests/requests/paginated | 
[**viewUsersRideRequests**](RideRequestApi.md#viewUsersRideRequests) | **GET** /ride-requests/user-requests | 
[**viewUsersRideRequestsPaginated**](RideRequestApi.md#viewUsersRideRequestsPaginated) | **GET** /ride-requests/user-requests/paginated | 



## answerRideOffer

> RideRequestResponse answerRideOffer(answerRideRequestRequest)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideRequestApi();
let answerRideRequestRequest = new CarPoolApi.AnswerRideRequestRequest(); // AnswerRideRequestRequest | 
apiInstance.answerRideOffer(answerRideRequestRequest, (error, data, response) => {
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
 **answerRideRequestRequest** | [**AnswerRideRequestRequest**](AnswerRideRequestRequest.md)|  | 

### Return type

[**RideRequestResponse**](RideRequestResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createRideRequest

> Number createRideRequest(rideRequestRequest)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideRequestApi();
let rideRequestRequest = new CarPoolApi.RideRequestRequest(); // RideRequestRequest | 
apiInstance.createRideRequest(rideRequestRequest, (error, data, response) => {
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
 **rideRequestRequest** | [**RideRequestRequest**](RideRequestRequest.md)|  | 

### Return type

**Number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteRideRequest

> deleteRideRequest(id)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideRequestApi();
let id = 789; // Number | 
apiInstance.deleteRideRequest(id, (error, data, response) => {
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


## getRideOffers

> [RideRequestResponse] getRideOffers(rideOfferId)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideRequestApi();
let rideOfferId = 789; // Number | 
apiInstance.getRideOffers(rideOfferId, (error, data, response) => {
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
 **rideOfferId** | **Number**|  | 

### Return type

[**[RideRequestResponse]**](RideRequestResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRideRequestsForRideOfferPaginated

> PageResponseRideRequestResponse getRideRequestsForRideOfferPaginated(rideOfferId, opts)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideRequestApi();
let rideOfferId = 789; // Number | 
let opts = {
  'page': 0, // Number | 
  'size': 10 // Number | 
};
apiInstance.getRideRequestsForRideOfferPaginated(rideOfferId, opts, (error, data, response) => {
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
 **rideOfferId** | **Number**|  | 
 **page** | **Number**|  | [optional] [default to 0]
 **size** | **Number**|  | [optional] [default to 10]

### Return type

[**PageResponseRideRequestResponse**](PageResponseRideRequestResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## viewUsersRideRequests

> [RideRequestResponse] viewUsersRideRequests()



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideRequestApi();
apiInstance.viewUsersRideRequests((error, data, response) => {
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

[**[RideRequestResponse]**](RideRequestResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## viewUsersRideRequestsPaginated

> PageResponseRideRequestResponse viewUsersRideRequestsPaginated(opts)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.RideRequestApi();
let opts = {
  'page': 0, // Number | 
  'size': 10 // Number | 
};
apiInstance.viewUsersRideRequestsPaginated(opts, (error, data, response) => {
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

[**PageResponseRideRequestResponse**](PageResponseRideRequestResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


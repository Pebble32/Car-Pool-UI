# CarPoolApi.AuthenticationRegistrationApi

All URIs are relative to *process.env.REACT_APP_BACKEND_URL*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authenticate**](AuthenticationRegistrationApi.md#authenticate) | **POST** /auth/authenticate | 
[**check**](AuthenticationRegistrationApi.md#check) | **GET** /auth/check | 
[**logout**](AuthenticationRegistrationApi.md#logout) | **POST** /auth/logout | 
[**register**](AuthenticationRegistrationApi.md#register) | **POST** /auth/register | 



## authenticate

> Object authenticate(authenticationRequest)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.AuthenticationRegistrationApi();
let authenticationRequest = new CarPoolApi.AuthenticationRequest(); // AuthenticationRequest | 
apiInstance.authenticate(authenticationRequest, (error, data, response) => {
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
 **authenticationRequest** | [**AuthenticationRequest**](AuthenticationRequest.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## check

> Object check()



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.AuthenticationRegistrationApi();
apiInstance.check((error, data, response) => {
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

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## logout

> Object logout()



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.AuthenticationRegistrationApi();
apiInstance.logout((error, data, response) => {
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

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## register

> Object register(registerRequest)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.AuthenticationRegistrationApi();
let registerRequest = new CarPoolApi.RegisterRequest(); // RegisterRequest | 
apiInstance.register(registerRequest, (error, data, response) => {
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
 **registerRequest** | [**RegisterRequest**](RegisterRequest.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


# CarPoolApi.UserApi

All URIs are relative to *process.env.REACT_APP_BACKEND_URL*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getProfilePicture**](UserApi.md#getProfilePicture) | **GET** /users/profile-picture | 
[**getUsersPaginated**](UserApi.md#getUsersPaginated) | **GET** /users/all/paginated | 
[**uploadProfilePicture**](UserApi.md#uploadProfilePicture) | **POST** /users/profile-picture | 



## getProfilePicture

> String getProfilePicture()



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.UserApi();
apiInstance.getProfilePicture((error, data, response) => {
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

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getUsersPaginated

> PageResponseUserResponse getUsersPaginated(opts)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.UserApi();
let opts = {
  'page': 0, // Number | 
  'size': 10 // Number | 
};
apiInstance.getUsersPaginated(opts, (error, data, response) => {
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

[**PageResponseUserResponse**](PageResponseUserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## uploadProfilePicture

> Object uploadProfilePicture(file)



### Example

```javascript
import CarPoolApi from 'car_pool_api';

let apiInstance = new CarPoolApi.UserApi();
let file = "/path/to/file"; // File | 
apiInstance.uploadProfilePicture(file, (error, data, response) => {
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
 **file** | **File**|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json


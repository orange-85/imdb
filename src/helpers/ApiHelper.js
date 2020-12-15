import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import StorageFields from '../constants/StorageFields';
import DropDownHelper from './DropDownHelper';

export const LIMIT = 20;

export const api = async (
  url,
  params,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
) => {
  const baseUrl = url.startsWith('http') ? url : 'https://imdb.hriks.com/';
  const token = await AsyncStorage.getItem(StorageFields.userToken);
  try {
    let headers = {
      'content-type': 'application/json; charset=utf-8',
      Authorization: token && `Token ${token}`,
    };
    let paramsData = null;
    if (method === 'GET') {
      paramsData = params;
      params = null;
    }
    const response = await axios({
      baseURL: baseUrl,
      url,
      timeout: 20000,
      data: params, // POST
      params: paramsData, // GET
      headers: headers,
      method,
      validateStatus: function (status) {
        return status >= 200 && status < 600; // default
      },
    });
    console.log(method + ': ' + url, response);
    if (response.status >= 300) {
      return {
        data: null,
        next: null,
        status: response.status,
        success: false,
      };
    }
    return {
      data: response.data,
      next: response.data.next,
      status: response.status,
      success: true,
    };
  } catch (error) {
    console.log('ERROR in: ' + url, error);
    DropDownHelper.showError('Error', error);
    return {data: null, next: null, status: 0, success: false};
  }
};

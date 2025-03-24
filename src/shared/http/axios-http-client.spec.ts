import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { AxiosHttpClient } from './axios-http-client';

describe('AxiosHttpClient', () => {
  let mock: AxiosMockAdapter;
  let httpClient: AxiosHttpClient;

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios);
    httpClient = new AxiosHttpClient({
      baseURL: 'https://api.example.com',
      timeout: 10000,
    });
  });

  afterEach(() => {
    mock.reset();
  });

  it('should be able to perform a GET request with the Authorization header', async () => {
    const responseData = { data: 'some data' };
    mock.onGet('/test').reply(200, responseData);
    const result = await httpClient.get('/test');
    expect(result).toEqual(responseData);
  });

  it('should be able to perform a POST request with the Authorization header', async () => {
    const postData = { name: 'John' };
    const responseData = { id: 1, ...postData };
    mock.onPost('/test', postData).reply(201, responseData);
    const result = await httpClient.post('/test', postData);
    expect(result).toEqual(responseData);
  });

  it('should be able to perform a PUT request with the Authorization header', async () => {
    const putData = { name: 'Jane' };
    const responseData = { id: 1, ...putData };
    mock.onPut('/test/1', putData).reply(200, responseData);
    const result = await httpClient.put('/test/1', putData);
    expect(result).toEqual(responseData);
  });

  it('should be able to perform a DELETE request with the Authorization header', async () => {
    const responseData = { message: 'Deleted successfully' };
    mock.onDelete('/test/1').reply(200, responseData);
    const result = await httpClient.delete('/test/1');
    expect(result).toEqual(responseData);
  });

  it('should handle errors correctly for GET request', async () => {
    const errorMessage = 'Request failed with status code 404';
    mock.onGet('/test').reply(404);
    await expect(httpClient.get('/test')).rejects.toThrowError(errorMessage);
  });

  it('should handle errors correctly for POST request', async () => {
    const postData = { name: 'John' };
    const errorMessage = 'Request failed with status code 500';
    mock.onPost('/test', postData).reply(500);
    await expect(httpClient.post('/test', postData)).rejects.toThrowError(
      errorMessage,
    );
  });
});

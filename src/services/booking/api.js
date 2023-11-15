// src/api.js
import axios from 'axios';
import { URL_API } from '../../constants/env';

const BASE_URL = URL_API;

export const getBannersHotels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/hotels_banners`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCitiesHotel = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cities`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/hotels-web`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotelsFiltered = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/hotels_filtered`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const makeReservation = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/reservation`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
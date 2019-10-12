import {HOST_NAME} from '../constants';
export const fetchDeals = async () => {
  try {
    const response = await fetch(HOST_NAME + 'deals');
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    console.error(e);
  }
};

export const fetchDealDetails = async dealId => {
  try {
    const response = await fetch(HOST_NAME + 'deals/' + dealId);
    const responseJson = response.json();
    return responseJson;
  } catch (e) {
    console.error(e);
  }
};

export const fetchDealDetailsFromText = async searchTerm => {
  try {
    const response = await fetch(HOST_NAME + 'deals?searchTerm=' + searchTerm);
    const responseJson = response.json();
    return responseJson;
  } catch (e) {
    console.error(e);
  }
};

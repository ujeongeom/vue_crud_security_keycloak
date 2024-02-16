import { useAuthStore } from '@/stores/useAuth';

//import { inject } from 'vue';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

function request(method) {
  return async (url, body) => {
    const composeUrl = url; //import.meta.env.VITE_API_URL + url

    const requestOptions = {
      method,
      headers: authHeader(composeUrl)
    };
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }
    const response = await fetch(composeUrl, requestOptions);
    return handleResponse(response);
  };
}


// helper functions

function authHeader() {

  //const keycloak = inject('keycloak');

  // return auth header with jwt if user is logged in and request is to the api url
  //const { user } = useAuthStore();
  const  token  = JSON.parse(localStorage.getItem('user'));
  //const { user }  = localStorage.getItem('user');
  const  isLoggedIn  = JSON.parse(localStorage.getItem('isLoggedIn'));

  //const isLoggedIn = !!user?.token;
  //const isLoggedIn = true ;//keycloak.authenticated;
  //keycloak.authenticated
  console.log('isLoggedIn', isLoggedIn);
  //console.log('isLoggedIn', keycloak.authenticated);


  //const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
  //if (isLoggedIn && isApiUrl) {
  if (isLoggedIn) {
    //return { Authorization: `Bearer ${user.token}` };
    return { Authorization: `Bearer ${token}` };
    //return { Authorization: `Bearer ${keycloak.token}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const { user, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && user) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}


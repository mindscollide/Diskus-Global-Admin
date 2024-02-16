const baseURL = "http://192.168.18.241";

//Services EndPoints
const serviceAutheticationURL = ":11001/ERM_Auth";

//Admin Endpoint
const adminApi = ":11009/Admin";

//Services URL

//Login Api URL
const authenticationURL = baseURL + serviceAutheticationURL;

//Admin Api URL
const adminURL = baseURL + adminApi;

export { authenticationURL, adminURL };

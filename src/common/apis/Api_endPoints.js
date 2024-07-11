const baseURL = "http://192.168.100.241";

//Services EndPoints
const serviceAutheticationURL = ":11001/ERM_Auth";

//Admin Endpoint
const adminApi = ":11009/Admin";

//Excel Report
const excelReport = ":11020/ExcelReport";

//Services URL

//Login Api URL
const authenticationURL = baseURL + serviceAutheticationURL;

//Admin Api URL
const adminURL = baseURL + adminApi;

//Excel Report URL
const excelURL = baseURL + excelReport;

export { authenticationURL, adminURL, excelURL };

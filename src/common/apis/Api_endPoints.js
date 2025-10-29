const baseURL = process.env.REACT_APP_BASE_URL;

//Services EndPoints
const serviceAutheticationURL = process.env.REACT_APP_AUTH_API;

//Admin Endpoint
const adminApi = process.env.REACT_APP_ADMIN_API;

//Audit Endpoint
const auditApi = process.env.REACT_APP_AUDIT_API;

//Excel Report
const excelReport = process.env.REACT_APP_REPORT_DOWNLOAD_API;

//Services URL

//Login Api URL
const authenticationURL = baseURL + serviceAutheticationURL;

//Admin Api URL
const adminURL = baseURL + adminApi;

//Audit Api URL
const auditURL = baseURL + auditApi;

//Excel Report URL
const excelURL = baseURL + excelReport;

export { authenticationURL, adminURL, excelURL, auditURL };

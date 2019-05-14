const baseUrl = "http://localhost:" + (process.env.PORT || "3000");
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

const callTimeout = 8000;
const displayTimeout = 1000;
const successCode = 200;

export { apiUrl, baseUrl, callTimeout, displayTimeout, successCode };

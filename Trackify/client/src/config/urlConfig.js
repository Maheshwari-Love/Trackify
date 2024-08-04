let BASE_URL =
  process.env.NODE_ENV === "development" // implement .env file !!
    ? "http://localhost:5004"
    : "http://localhost:5000"; 
export default BASE_URL;       
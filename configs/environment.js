// config/environment.js
const prod = {
    baseUrl:"http://bouncerentalsolutions.com/",
    ENV: "prod"
};

const staging = {
    baseUrl: "https://testingbrs.com/",
    ENV: "staging"
};
const ENV = process.env.TEST_ENV || "prod";
const environmentConfig = {
    prod,
    staging,
};
export default environmentConfig[ENV];
const cron = require("node-cron");
const {
  changeTwoFAStatusInFiveMinutes,
} = require("../controllers/login-controllers/login-controllers");
const changeTWOFaStatus = () => {
  console.log("start change two fa status");
  changeTwoFAStatusInFiveMinutes();
  console.log("end change two fa status");
};
cron.schedule("0 */5 * * * *", changeTWOFaStatus);

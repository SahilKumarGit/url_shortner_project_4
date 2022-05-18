const redis = require("redis");
const {
    promisify
} = require("util");


//redis
//Connect to redis
const redisClient = redis.createClient(
    19311,
    "redis-19311.c301.ap-south-1-1.ec2.cloud.redislabs.com", {
        no_ready_check: true
    }
);
redisClient.auth("buwTQr8Vtlb98dV9FuxwLVoPXyV6Nhhc", function (err) {
    if (err) console.log("⚠️ ", err.message);
});

redisClient.on("connect", async function () {
    console.log("✅ Connected to Redis.");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

module.exports = {
    SET_ASYNC,
    GET_ASYNC
}
import rateLimit from "express-rate-limit";

export const rateLimitConfig = {
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // 5 requests per window
    message:
      "Too many authentication attempts, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
  }),
  api: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 100, // 100 requests per minute
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  }),
  workspace: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 30, // 30 requests per minute
    message: "Too many workspace operations, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  }),
};

// export const rateLimitConfig = {
//   auth: {
//     points: 5, // Number of requests
//     duration: 60 * 15, // 15 minutes
//     blockDuration: 60 * 60, // 1 hour block
//   },
//   api: {
//     points: 100, // Number of requests
//     duration: 60, // 1 minute
//     blockDuration: 60 * 15, // 15 minutes block
//   },
//   workspace: {
//     points: 30,
//     duration: 60,
//     blockDuration: 60 * 5,
//   },
// };

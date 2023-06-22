/**
 * Config source: https://git.io/JfefC
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { CorsConfig } from "@ioc:Adonis/Core/Cors";

const corsConfig: CorsConfig = {
  enabled: true,
  origin: [
    ...(process.env.FRONT_URL ? [process.env.FRONT_URL] : []),
    ...(process.env.FRONT_ADMIN_URL ? [process.env.FRONT_ADMIN_URL] : []),
  ],
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH"],
  headers: true,
  exposeHeaders: [
    "cache-control",
    "content-language",
    "content-type",
    "expires",
    "last-modified",
    "pragma",
  ],
  credentials: true,
  maxAge: 90,
};

export default corsConfig;

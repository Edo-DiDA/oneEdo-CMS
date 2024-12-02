/**
 * `cache-control` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In cache-control middleware.");

    await next();

    ctx.set("Cache-Control", "public, max-age=31536000");
  };
};

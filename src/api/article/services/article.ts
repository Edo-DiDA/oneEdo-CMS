/**
 * article service.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::article.article",
  ({ strapi }) => ({
    async findOne(documentId, params = {}) {
      const res = (await strapi.documents("api::article.article").findFirst({
        filters: {
          $or: [{ documentId }, { slug: documentId }],
        },
        ...this.getFetchParams(params),
      })) as any;

      if (!res) {
        return null;
      }

      return res;
    },
  })
);

/**
 * category service.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::category.category",
  ({ strapi }) => ({
    async findOne(documentId, params = {}) {
      const res = (await strapi.documents("api::category.category").findFirst({
        filters: {
          $or: [{ documentId }, { slug: documentId }],
        },
        ...this.getFetchParams(params),
      })) as any;

      if (!res) {
        return null;
      }

      return {
        ...res,
        keywords: res.keywords
          ? res.keywords.split(",").map((keyword: string) => keyword.trim())
          : [],
      };
    },
  })
);

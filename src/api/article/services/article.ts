/**
 * article service.
 */

import { factories } from "@strapi/strapi";
import { getRelationChain } from "./getCategoryChain";

export default factories.createCoreService(
  "api::article.article",
  ({ strapi }) => ({
    async findOne(documentId, params = {}) {
      const res = (await strapi.documents("api::article.article").findFirst({
        filters: {
          $or: [{ documentId }, { slug: documentId }],
        },
        populate: {
          category: true,
        },
        ...this.getFetchParams(params),
      })) as any;

      if (!res) {
        return null;
      }

      const breadcrumbs = await getRelationChain(
        strapi,
        res.category,
        "api::category.category",
        "parent"
      );

      return {
        ...res,
        breadcrumbs,
      };
    },
  })
);

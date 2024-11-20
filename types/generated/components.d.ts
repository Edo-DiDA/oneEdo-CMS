import type { Schema, Struct } from '@strapi/strapi';

export interface SharedArticles extends Struct.ComponentSchema {
  collectionName: 'components_shared_articles';
  info: {
    description: '';
    displayName: 'article';
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
  };
}

export interface SharedServicePage extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_pages';
  info: {
    description: '';
    displayName: 'Service Page';
  };
  attributes: {
    page: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.articles': SharedArticles;
      'shared.service-page': SharedServicePage;
    }
  }
}

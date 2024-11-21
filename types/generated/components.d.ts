import type { Schema, Struct } from '@strapi/strapi';

export interface SharedArticle extends Struct.ComponentSchema {
  collectionName: 'components_shared_articles';
  info: {
    displayName: 'Article';
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
  };
}

export interface SharedArticles extends Struct.ComponentSchema {
  collectionName: 'components_shared_article';
  info: {
    displayName: 'Article';
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
  };
}

export interface SharedPopularSuggestion extends Struct.ComponentSchema {
  collectionName: 'components_shared_popular_suggestions';
  info: {
    description: '';
    displayName: 'Popular Suggestion';
  };
  attributes: {
    Page: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
    Title: Schema.Attribute.String;
  };
}

export interface SharedServicePage extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_pages';
  info: {
    description: '';
    displayName: 'Category';
  };
  attributes: {
    page: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.article': SharedArticle;
      'shared.articles': SharedArticles;
      'shared.popular-suggestion': SharedPopularSuggestion;
      'shared.service-page': SharedServicePage;
    }
  }
}

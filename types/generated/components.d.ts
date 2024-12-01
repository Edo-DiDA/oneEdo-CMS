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

export interface SharedPopularSuggestion extends Struct.ComponentSchema {
  collectionName: 'components_shared_popular_suggestions';
  info: {
    description: '';
    displayName: 'Popular Suggestion';
  };
  attributes: {
    page: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
    title: Schema.Attribute.String;
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

export interface SharedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_texts';
  info: {
    displayName: 'Text';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.article': SharedArticle;
      'shared.popular-suggestion': SharedPopularSuggestion;
      'shared.service-page': SharedServicePage;
      'shared.text': SharedText;
    }
  }
}

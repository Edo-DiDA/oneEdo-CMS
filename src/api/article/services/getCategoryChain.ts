import { Core } from "@strapi/strapi";
//given an entity ID (not documentId),
//return the full chain of items for a relation field (manyToOne).
//NB: getRelationChainIds() uses a single DB request to retrieve the chain of IDs.

//How to use ?
//const chainItems = await getRelationChain(strapi,itemId,'api::category.category','parent');
//will return the whole hierarchy of items (as a flat ordered array) from the 'parent' field, for categories.

import _ from "lodash";

/**
 * Returns the full hierarchical chain of entries for the specified relation field (manyToOne)
 * This function will return an array of document ids.
 *
 * @param {Object} strapi - The Strapi instance used to interact with the database.
 * @param {number} itemId - The ID (not documentId!) of the target entry.
 * @param {string} itemUid - The UID of the target entry (eg. 'api::category.category')
 * @param {string} attributeName - The name of the attribute (field) that stores the relation, e.g., 'parent'.
 * @param {Object} relationsQuery - Optionnal query parameter for the entries returned.  Empty by default (returns only id and documentId)
 * @returns {Promise<string[]>} - A promise that resolves to an array of entry IDs representing the full relation chain.
 */

export async function getRelationChain(
  strapi: Core.Strapi,
  item: any,
  itemUid: string,
  attributeName: string
) {
  const uidSchema = strapi.contentType(itemUid as any);
  if (!uidSchema) {
    throw new Error("invalid UID");
  }
  const table_name = uidSchema.info.pluralName; //items table (for this itemId)

  const itemId = item.id;
  const { chainIds, treeMap } = await getRelationChainIds(
    strapi,
    itemId,
    itemUid,
    attributeName
  );
  if (!chainIds) return;

  const query = `
        SELECT id,document_id,name,slug,tier
        FROM ${table_name}
        WHERE id IN (${chainIds.map(() => "?").join(", ")})
      `;

  const result = await strapi.db.connection.raw(query, chainIds);
  result.rows.push(item);

  return transformToNestedStructure(
    result.rows.map((row) => ({
      id: row.id,
      documentId: row.document_id,
      name: row.name,
      slug: row.slug,
      tier: row.tier,
      parentId: treeMap[row.id],
    }))
  );
}

/**
 * Returns the full hierarchical chain of entries for the specified relation field (manyToOne)
 * This function will return an array of ids (not document ids).
 *
 * @param {Core.Strapi} strapi - The Strapi instance used to interact with the database.
 * @param {number} itemId - The ID (not documentId!) of the target entry.
 * @param {string} itemUid - The UID of the target entry (eg. 'api::category.category')
 * @param {string} attributeName - The name of the attribute (field) that stores the relation, e.g., 'parent'.
 *
 * @returns {Promise<number[]>} - A promise that resolves to an array of entry IDs representing the full relation chain.
 */
async function getRelationChainIds(
  strapi: Core.Strapi,
  itemId: number,
  itemUid: string,
  attributeName: string
) {
  const uidSchema = strapi.contentType(itemUid as any);
  if (!uidSchema) {
    throw new Error("invalid UID");
  }

  const attribute = uidSchema.attributes[attributeName];
  if (!attribute) {
    throw new Error("invalid attribute");
  }

  if (attribute.type !== "relation") {
    throw new Error("Attribute type should be 'relation'");
  }

  const uidRelationSchema = strapi.contentType(attribute.target);
  if (!uidRelationSchema) {
    throw new Error("invalid relation UID");
  }

  const pluralName = uidSchema.info.pluralName;
  const singularName = uidSchema.info.singularName;

  const table_name = `${pluralName}_${attributeName}_lnk`; //table that stores the relations for the field
  const id_col = `${singularName}_id`; //column for item ID
  const inv_id_col = `inv_${singularName}_id`; //column for parent ID

  const queryStr = `
    WITH RECURSIVE ParentHierarchy AS (
      SELECT ${id_col}, ${inv_id_col}
      FROM ${table_name}
      WHERE ${id_col} = ?
      UNION ALL
      SELECT l.${id_col}, l.${inv_id_col}
      FROM categories_parent_lnk l
      INNER JOIN ParentHierarchy ph ON l.${id_col} = ph.${inv_id_col}
    )
    SELECT ${id_col}, ${inv_id_col} FROM ParentHierarchy;
  `;

  const result = await strapi.db.connection.raw(queryStr, [itemId]);

  const treeMap = result.rows.reduce((acc, row) => {
    acc[row[id_col]] = row[inv_id_col];
    return acc;
  }, {});

  const chainIds = result.rows.map((row) => row[inv_id_col]).filter(Boolean);

  return { chainIds, treeMap };
}

function transformToNestedStructure(breadcrumbs) {
  const idMap = new Map();
  const visited = new Set(); // To track visited IDs and prevent infinite loops

  // Create a map for each breadcrumb by its `id`
  breadcrumbs.forEach((item) => {
    idMap.set(item.id, { ...item, child: null });
  });

  let root = null;

  // Step 2: Build the nested structure
  breadcrumbs.forEach((item) => {
    const current = idMap.get(item.id);

    // Check for cycles: Skip if already visited
    if (visited.has(item.id)) {
      console.warn(`Cycle detected at ID ${item.id}, skipping.`);
      return;
    }

    visited.add(item.id); // Mark as visited

    if (item.parentId) {
      // If the item has a parent, set it as the parent's single child
      const parent = idMap.get(item.parentId);

      if (parent) {
        // Ensure the parent does not already have a child
        if (parent.child) {
          console.warn(
            `Multiple children detected for parent ID ${item.parentId}, keeping the first child.`
          );
        } else {
          parent.child = current;
        }
      }
    } else {
      // If the item has no parent, it's the root
      root = current;
    }
  });

  return root;
}

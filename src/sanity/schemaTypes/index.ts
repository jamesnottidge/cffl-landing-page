import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import  newsType  from './newsType' // 👈 Add this line
import upcoming from "./upcoming";
import replay from "./replay"; // ✅ Import the new schema

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, newsType,upcoming,replay], // 👈 And this one
}

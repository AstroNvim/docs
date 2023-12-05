import { defineCollection } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { docSearchI18nSchema } from "@astrojs/starlight-docsearch/schema";

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  i18n: defineCollection({
    type: "data",
    schema: i18nSchema({ extend: docSearchI18nSchema() }),
  }),
};

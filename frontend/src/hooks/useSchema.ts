import jsonSchema_2023_1224 from "@/jsonSchemas/diary_2023_1224.json"
import jsonSchema_2023_1225 from "@/jsonSchemas/diary_2023_1225.json"

type FormData20231224 = {
  content: {
    name: string
    note: string
  }
}

type FormData20231225 = {
  content: {
    color: string,
    name: string,
    variety?: string
    note: string
  }
}

export type FormData = FormData20231224 | FormData20231225

export const useSchema = () => {
  const importJsonSchema = (version: string) => {
    switch (version) {
      case '2023_1225':
        return jsonSchema_2023_1225
      default:
        return jsonSchema_2023_1224
    }
  }

  const importCurrentJsonSchema = () => {
    return importJsonSchema(import.meta.env.VITE_CURRENT_JSON_SCHEMA_VERSION)
  }

  const toFormData = (responseData, version): FormData => {
    switch (version) {
      case '2023_1225':
        return {
          content: {
            color: responseData.content.color,
            name: responseData.content.name,
            variety: responseData.content?.variety,
            note: responseData.content.note
          }
        }
      default:
        return {
          content: {
            name: responseData.content.name,
            note: responseData.content.note
          }
        }
    }
  }

  return {importJsonSchema, importCurrentJsonSchema, toFormData}
}
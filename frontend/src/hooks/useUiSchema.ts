import {UiSchema} from "@rjsf/utils";

export const useUiSchema = () => {
  const uiSchema: UiSchema = {
    content: {
      note: {
        'ui:options': {
          widget: 'textarea',
          rows: 5
        }
      }
    },
    'ui:submitButtonOptions': {
      submitText: '保存する'
    }
  }

  return {uiSchema}
}
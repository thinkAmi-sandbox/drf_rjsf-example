import { getTemplate, FormContextType, RJSFSchema, StrictRJSFSchema, WidgetProps } from '@rjsf/utils';

export default function MyTextWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: WidgetProps<T, S, F>
) {
  const { options, registry, formContext } = props;
  const BaseInputTemplate = getTemplate<'BaseInputTemplate', T, S, F>('BaseInputTemplate', registry, options);

  const version = formContext.version

  if (version !== import.meta.env.VITE_CURRENT_JSON_SCHEMA_VERSION) {
    return <BaseInputTemplate {...props} style={{background: 'lightgray'}} />;
  }

  return <BaseInputTemplate {...props} />;
}
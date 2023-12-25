import {Link, useNavigate} from "@tanstack/react-router";
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';
import {useDiary} from "@/hooks/useDiary";
import {useUiSchema} from "@/hooks/useUiSchema";
import Stack from "@mui/material/Stack";
import React from "react";
import {useSchema} from "../../hooks/useSchema";
import MyTextWidget from "../widgets/MyTextWidget";
import {RegistryWidgetsType} from "@rjsf/utils";
import {useWidget} from "../../hooks/useWidget";


type FormData = {
  content: {
    name: string
    note: string
  }
}

export const New = () => {
  const {createDiary} = useDiary()

  const {mutate} = createDiary()
  const navigate = useNavigate()

  const {uiSchema} = useUiSchema()
  const {importCurrentJsonSchema} = useSchema()
  const {widgets} = useWidget()

  // https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/form-props#onsubmit
  const handleSubmit = ({formData}, _event) => {
    mutate(formData.content, {
      onSuccess: (data) => {
        const {data: {id}} = data
        navigate({to: '/$diaryId/edit', params: {diaryId: id}})
      }
    })
  }

  const formContext = {
    version: import.meta.env.VITE_CURRENT_JSON_SCHEMA_VERSION
  }

  return (
    <>
      <Stack direction="row" sx={{textAlign: "center", mb: 5}} alignItems='center' justifyContent={'space-between'}>
        <h2>新規作成</h2>
        <div>
          <Link search={() => {}} to="/">戻る</Link>
        </div>
      </Stack>

      <Form<FormData> schema={importCurrentJsonSchema()} uiSchema={uiSchema} validator={validator} onSubmit={handleSubmit}
                      widgets={widgets}
                      formContext={formContext}
      />
    </>
  )
}
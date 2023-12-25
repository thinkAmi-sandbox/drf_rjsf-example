import {Link, useNavigate} from "@tanstack/react-router";
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';
import jsonSchema from "@/jsonSchemas/diary.json"
import {useDiary} from "@/hooks/useDiary";
import {useUiSchema} from "@/hooks/useUiSchema";
import Stack from "@mui/material/Stack";
import React from "react";


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

  // https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/form-props#onsubmit
  const handleSubmit = ({formData}, _event) => {
    mutate(formData.content, {
      onSuccess: (data) => {
        const {data: {id}} = data
        navigate({to: '/$diaryId/edit', params: {diaryId: id}})
      }
    })
  }

  return (
    <>
      <Stack direction="row" sx={{textAlign: "center", mb: 5}} alignItems='center' justifyContent={'space-between'}>
        <h2>新規作成</h2>
        <div>
          <Link search={() => {}} to="/">戻る</Link>
        </div>
      </Stack>

      <Form<FormData> schema={jsonSchema} uiSchema={uiSchema} validator={validator} onSubmit={handleSubmit}/>
    </>
  )
}
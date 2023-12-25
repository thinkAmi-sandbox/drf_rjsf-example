import {Link, useNavigate, useParams} from "@tanstack/react-router";
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';
import {useDiary} from "@/hooks/useDiary";
import React, {useEffect, useState} from "react";
import {useUiSchema} from "@/hooks/useUiSchema";
import Stack from "@mui/material/Stack";
import {FormData, useSchema} from "../../hooks/useSchema";
import {useWidget} from "../../hooks/useWidget";


type ApiResponse = {
  id: number,
  name: string,
  content: FormData,
  version: string,
  updated_at: string
}

export const Edit = () => {
  const {diaryId} = useParams({strict: false})

  const {updateDiary, fetchDiary} = useDiary()
  const {isLoading, data} = fetchDiary<ApiResponse>(diaryId)

  const {mutate} = updateDiary(diaryId)
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>()
  const {uiSchema} = useUiSchema()

  const [version, setVersion] = useState('2023_1224')
  const {importJsonSchema, toFormData} = useSchema()
  const {widgets} = useWidget()

  // https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/form-props#onsubmit
  const handleSubmit = ({formData}, _event) => {
    mutate(formData.content, {
      onSuccess: () => {
        navigate({to: '/'})
      }
    })
  }

  useEffect(() => {
    if (!data) return

    setVersion(data.version)

    setFormData(toFormData(data, data.version))
  }, [data])

  if (isLoading) return <div>Loading</div>

  const formContext = {
    version: version
  }

  return (
    <>
      <Stack direction="row" sx={{textAlign: "center", mb: 5}} alignItems='center' justifyContent={'space-between'}>
        <h2>編集</h2>
        <div>
          <Link search={() => {
          }} to="/">戻る</Link>
        </div>
      </Stack>

      <Form<FormData> schema={importJsonSchema(version)} uiSchema={uiSchema} validator={validator} formData={formData}
                      widgets={widgets}
                      formContext={formContext}
                      onSubmit={handleSubmit}/>
    </>
  )
}
import {Link, useNavigate, useParams} from "@tanstack/react-router";
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';
import jsonSchema from "@/jsonSchemas/diary.json"
import {useDiary} from "@/hooks/useDiary";
import React, {useEffect, useState} from "react";
import {useUiSchema} from "@/hooks/useUiSchema";
import Stack from "@mui/material/Stack";


type FormData = {
  content: {
    name: string
    note: string
  }
}

type ApiResponse = {
  id: number,
  name: string,
  content: FormData,
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

    setFormData(
      {
        content: {
          name: data.content.name,
          note: data.content.note
        }
      }
    )
  }, [data])

  if (isLoading) return <div>Loading</div>

  return (
    <>
      <Stack direction="row" sx={{textAlign: "center", mb: 5}} alignItems='center' justifyContent={'space-between'}>
        <h2>編集</h2>
        <div>
          <Link search={() => {
          }} to="/">戻る</Link>
        </div>
      </Stack>

      <Form<FormData> schema={jsonSchema} uiSchema={uiSchema} validator={validator} formData={formData}
                      onSubmit={handleSubmit}/>
    </>
  )
}
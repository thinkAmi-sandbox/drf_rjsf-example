import {Link} from "@tanstack/react-router";
import {BASE_QUERY_KEY, useDiary} from "@/hooks/useDiary";
import {useQueryClient} from "@tanstack/react-query";
import Button from '@mui/material/Button'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from "@mui/material/Stack";
import React from "react";


type ApiResponse = {
  id: number,
  name: string,
  content: string,
  updated_at: string
}

const BASE_URL = 'http://localhost:8000'

export const Index = () => {
  const {fetchDiaries, deleteDiary} = useDiary()
  const {isLoading, data} = fetchDiaries<ApiResponse[]>()
  const {mutate} = deleteDiary()
  const queryClient = useQueryClient()

  const handleDelete = (diaryId) => {
    mutate(diaryId, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [BASE_QUERY_KEY]})
      }
    })
  }

  if (isLoading) return <div>Loading</div>

  return (
    <>
      <Stack direction="row" sx={{textAlign: "center"}} alignItems='center' justifyContent={'space-between'}>
        <h2>一覧</h2>
        <div>
          <Link search={() => {}} to={`${BASE_URL}/new`}>新規作成する</Link>
        </div>
      </Stack>

      <List>
        {data.map((d) => {
          // search propsが必須なので、空の関数を渡しておく
          return (
            <ListItem key={d.id}>
              <Stack direction="row" sx={{textAlign: "center"}} alignItems='center' spacing={4}>
                <Button variant={'outlined'} sx={{mr: 10}} onClick={() => handleDelete(d.id)}>削除</Button>
                <Link search={() => {
                }} to={`${BASE_URL}/${d.id}/edit`}>{d.name}</Link>
              </Stack>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
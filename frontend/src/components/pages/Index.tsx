import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Link} from "@tanstack/react-router";

type ApiResponse = {
  id: number,
  name: string,
  content: string,
  updated_at: string
}

const BASE_URL = 'http://localhost:8000'

export const Index = () => {
  const {isLoading, data} = useQuery({
    queryKey: ['diaries'],
    queryFn: async () => {
      const response = await axios.get<ApiResponse[]>(`${BASE_URL}/api/diaries/`)
      return response.data
    }
  })

  if (isLoading) return <div>Loading</div>

  return (
     <>
       <h1>一覧</h1>
       <ul>
         {data.map((d)=> {
           // search propsが必須なので、空の関数を渡しておく
           return <li key={d.id}><Link search={() => {}} to={`${BASE_URL}/${d.id}`}>{d.name}</Link></li>
       })}
       </ul>
    </>
  )
}
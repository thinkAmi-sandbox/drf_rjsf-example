import {useQuery, useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useAxios} from "./useAxios";

const BASE_API_ENDPOINT = 'http://localhost:8000/api/diaries'
export const BASE_QUERY_KEY = 'diaries'

export const useDiary = () => {
  const fetchDiaries = <T>() => {
    return useQuery({
      queryKey: [BASE_QUERY_KEY],
      queryFn: async () => {
        const response = await axios.get<T>(`${BASE_API_ENDPOINT}/`)
        return response.data
      }
    })
  }

  const fetchDiary = <T>(diaryId: number) => {
    return useQuery({
      queryKey: [BASE_QUERY_KEY, diaryId],
      queryFn: async () => {
        const response = await axios.get<T>(`${BASE_API_ENDPOINT}/${diaryId}/`)
        return response.data
      }
    })
  }

  const createDiary = () => {
    const {instance} = useAxios()
    return useMutation({
      mutationFn: (content: string) => {
        return instance.post(`${BASE_API_ENDPOINT}/`, {content})
      }
    })
  }

  const updateDiary = (diaryId: number) => {
    const {instance} = useAxios()
    return useMutation({
      mutationFn: (content: string) => {
        return instance.put(`${BASE_API_ENDPOINT}/${diaryId}/`, {content})
      }
    })
  }

  const deleteDiary = () => {
    const {instance} = useAxios()
    return useMutation({
      mutationFn: (diaryId: number) => {
        return instance.delete(`${BASE_API_ENDPOINT}/${diaryId}/`)
      }
    })
  }

  return {fetchDiaries, fetchDiary, createDiary, updateDiary, deleteDiary}
}
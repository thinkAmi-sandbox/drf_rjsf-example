import axios from "axios";

export const useAxios = () => {
  const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  const csrfToken = getCookie('csrftoken')

  const instance = axios.create()
  instance.interceptors.request.use((config) => {
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken
    }
    return config
  })

  return {instance}
}
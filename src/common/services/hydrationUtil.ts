import { AppDispatch } from '../store/store'
import { moviesApi } from './moviesApiTMDB'

// Функция для инициализации запроса API на сервере
export const initializeMovieApi = async (
  dispatch: AppDispatch,
  filters: { [key: string]: any }
) => {
  // Выполняем запрос через dispatch для предзагрузки данных на сервере
  await dispatch(moviesApi.endpoints.fetchMoviesByFilters.initiate(filters))
}

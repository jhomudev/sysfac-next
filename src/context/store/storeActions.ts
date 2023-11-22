import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from './configureStore'

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch:() => AppDispatch = useDispatch

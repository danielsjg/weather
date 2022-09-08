import {
  TypedUseSelectorHook,
  useDispatch as dispatch,
  useSelector as selector,
} from 'react-redux';
import { AppDispatch } from './';
import { RootState } from './modules/rootReducer';

export const useDispatch = () => dispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selector;

import { combineReducers } from '@reduxjs/toolkit';

import weather from './weather/slice';

const rootReducer = combineReducers({
  weather,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

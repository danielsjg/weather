import { all } from 'typed-redux-saga';

import weather from './weather/sagas';

export default function* rootReducer() {
  return yield* all([weather]);
}

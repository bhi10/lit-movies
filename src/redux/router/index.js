import { init, registerFallbackCallback } from '@dreamworld/router';
import { URLs } from './urls';
import * as _selectors from './selector';

import store from '../store';

export const selectors = _selectors;

init(URLs, store);

export * from '@dreamworld/router';
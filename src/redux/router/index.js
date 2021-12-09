import { init, registerFallbackCallback } from '@dreamworld/router';
import { URLs } from './urls';
import fallbackCallback from './fallback-callback';
import * as _selectors from './selector';

import { store } from '../store';

export const selectors = _selectors;

init(URLs, store);
registerFallbackCallback(fallbackCallback);

export * from '@dreamworld/router';
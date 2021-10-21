const INITIAL_STATE = {theme: 'light'};

const app = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case "themeChange":
      return { ...state, theme: action.theme};
      
  }
  return state;
}

export default app;
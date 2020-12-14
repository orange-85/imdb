import {LOGING, LOGOUT} from '../actions/AuthActions';

const initialState = {token: null};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGING:
      return {token: action.payload};
    case LOGOUT:
      return {token: null};
    default:
      return state;
  }
};

export default AuthReducer;

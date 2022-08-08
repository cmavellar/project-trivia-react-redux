import { GET_INFO_PLAYER, GET_PICTURE } from '../actions';

const INITIAL_STATE = {
  name: '', // nome - da - pessoa,
  assertions: 0, // número - de - acertos,
  score: 0, // pontuação,
  gravatarEmail: '', // email - da - pessoa,
};

const player = (state = INITIAL_STATE, { type, name, gravatarEmail }) => {
  switch (type) {
  case GET_INFO_PLAYER:
    return {
      ...state,
      name,
    };
  case GET_PICTURE:
    return {
      ...state,
      gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;

export const GET_INFO_PLAYER = 'GET_INFO_PLAYER';

export const getInfoPlayer = (name) => ({
  type: GET_INFO_PLAYER,
  name,
});

export const GET_PICTURE = 'GET_PICTURE';

export const getPicture = (gravatarEmail) => ({
  type: GET_PICTURE,
  gravatarEmail,
});

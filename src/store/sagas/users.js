import { call, put, select } from 'redux-saga/effects';
import api from 'services/api';

import { Creators as UserActions } from 'store/ducks/users';


export function* addUserRequest(action) {
  try {
    const response = yield call(api.get, `/users/${action.payload.userName}`);

    const userData = response.data;

    const coordinates = yield select(state => state.users.coordinates);
    console.tron.log('coordinates ', coordinates);
    const newUser = {
      login: userData.login,
      name: userData.name,
      bio: userData.bio,
      avatar: userData.avatar_url,
      coordinates: {
        lat: coordinates[0],
        lon: coordinates[1],
      },
    };

    console.tron.log('newUser ', newUser);

    const users = yield select(state => state.users.data);
    console.tron.log('usuarios: ', users);
    if (users.find(user => user.login === newUser.login)) {
      yield put(UserActions.addUserError('Usuário duplicado'));
    } else {
      yield put(UserActions.addUserSuccess(newUser));
    }
  } catch (error) {
    yield put(UserActions.addUserError('Usuário não existe'));
  }
}

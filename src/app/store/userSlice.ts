// eslint-disable-next-line import/named
import { createSlice, createAsyncThunk, SliceCaseReducers } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface UserState {
  entity: User;
  loading: boolean;
}

export const createUser = createAsyncThunk('user/createUser', async ({ name, avatar }: { name: string; avatar: string }) => {
  const response = await fetch('http://localhost:3001/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar }),
  });
  return response.json();
});

const initialState: UserState = {
  entity: {
    name: '',
    avatar: '',
    id: '',
  },
  loading: false,
};

export const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;

        const { id, name, avatar } = action.payload;
        state.entity = { id, name, avatar };
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;

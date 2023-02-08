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

export const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
  name: 'user',
  initialState: {
    entity: {
      name: '',
      avatar: '',
      id: '',
    },
    loading: false,
  },
  reducers: {},
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

export default userSlice.reducer;

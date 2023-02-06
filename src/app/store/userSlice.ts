import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    avatar: '',
    id: '',
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
        state.id = id;
        state.name = name;
        state.avatar = avatar;
      });
  },
});

export default userSlice.reducer;

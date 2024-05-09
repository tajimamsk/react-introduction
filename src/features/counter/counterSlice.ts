import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './counterAPI';

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

//　counterAPI.tsから呼び出す
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // この値をextraReducersに渡して後処理する
    return response.data;
  }
);

// actionをusedispatchでstor(slice)で受け取る
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // action,stateを受け取ってロジックを書く
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // actionではtypeだけでなくなんらかの値も渡せる（payload
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 処理中
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      // 成功
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // 正常終了するたびに値が追加される
        state.value += action.payload;
      })
      // 失敗
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// useSelectorで取得する
export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default counterSlice.reducer;

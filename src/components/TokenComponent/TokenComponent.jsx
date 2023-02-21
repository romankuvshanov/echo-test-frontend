import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "../../features/counter/counterSlice";
import { selectToken, update, clear } from "../../features/token/tokenSlice";

export default function TokenComponent() {
  const count = useSelector(selectToken);
  const dispatch = useDispatch();
  console.log(count);
  return (
    <>
      <p>{count ? count : ""}</p>
      <button onClick={() => dispatch(update("dfdffd"))}>Click</button>
      <button onClick={() => dispatch(clear())}>Click2</button>
    </>
  );
}

import { useContext, useReducer } from "react";
import Display from "./Display";
import Button from "./Button";
import CounterContext from "./CounterContext";

function App() {
  const [counter, counterDispatch] = useContext(CounterContext);
  console.log(CounterContext);

  return (
    <>
      <CounterContext.Provider value={[counter, counterDispatch]}>
        <Display counter={counter} />

        <div>
          <Button dispatch={counterDispatch} type="INC" label="+" />
          <Button dispatch={counterDispatch} type="DEC" label="-" />
          <Button dispatch={counterDispatch} type="ZERO" label="0" />
        </div>
      </CounterContext.Provider>
    </>
  );
}

export default App;

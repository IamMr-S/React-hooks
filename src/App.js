import {useMemo, useContext, useEffect, useReducer, useRef, useState, useCallback} from 'react';
import './App.css';
import CreatorContext from "./index";
import SomeChild from './SomeChild';
import useLocalStorage from './useLocalStorage';

const reducer = (state, action) => {
  switch(action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

function App() {
  // let count = 0;
  const [count, setCount] = useState(0); // カウントの初期値０を設定
  const [countMessage, setCountMessage] = useState('');
  const creatorInfo = useContext(CreatorContext); // ログイン情報とかあらゆるコンポーネントで使うデータとかで使うと便利
  const ref = useRef(); // inputの内容を参照したいときとかに使う
  const [inputValue, setInputValue] = useState();
  const [state, dispatch] = useReducer(reducer, 0) // 前のstateに基づいて次のstateを決める時などに使うがぶっちゃけ覚えなくてもいい
  const [count1, setCount1] = useState(0); // ブラウザのメモリに情報を保存することができる
  const [count2, setCount2] = useState(0);
  const [counter, setCounter] = useState(0); // ブラウザのメモリに関数を保存することができる
  const [age, setAge] = useLocalStorage('age', 20); // useLocalStorageという値をローカルストレージに保存するカスタムフックを作成する

  const handleClick = () => {
    // count++; 内部的に値は変化してるけどレンダリングされていないから画面に変化がない
    // console.log('count: ' + count);
    setCount(count + 1);
  };

  useEffect(() => {
    // setCount(count + 1); 無限ループになる
    setCountMessage(countMessage + 'clicked! ');
  }, [count]); // 第二引数が空の配列の時はページが読み込まれた時に発火

  const handleRef = () => {
    setInputValue(ref.current.value);
  };

  const square = useMemo(() => { // 重たい処理でレンダリングがされるたびこの処理が実行されるがuseMemoを使うとこの場合count2以外ではこの処理は実行されない
    let i = 0;
    while (i < 200000000) {
      i++;
    }
    return count2 * count2;
  }, [count2]);

  const showCount = useCallback(() => { // 重たい処理でレンダリングがされるたびこの処理が実行されるがuseCallbackを使うとこの場合counter以外ではこの処理は実行されない
    alert('これは重たい処理です');
  }, [counter]);

  /*
  useMemoやuseCallbackは動作の軽量化のために使うといい 
  */

  return (
    <div className="App">
      <h1>useState</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>

      <h1>useEffect</h1>
      <p>click upper button</p>
      <p>{countMessage}</p>

      <h1>useContext</h1>
      <p>{creatorInfo.name}</p>
      <p>{creatorInfo.age}</p>

      <h1>useRef</h1>
      <input type='text' ref={ref} />
      <button onClick={handleRef}>useRef</button>
      <p>{inputValue}</p>

      <h1>useReducer</h1>
      <p>Count: {state}</p>
      <button onClick={() => dispatch({type: "increment"})}>+</button>
      <button onClick={() => dispatch({type: "decrement"})}>-</button>

      <h1>useMemo</h1>
      <div>Count1: {count1}</div>
      <div>Count2: {count2}</div>
      <div>result: {square}</div>
      <button onClick={() => setCount1(count1 + 1)}>+</button>
      <button onClick={() => setCount2(count2 + 1)}>+</button>

      <h1>useCallBack</h1>
      <SomeChild showCount={showCount} />

      <h1>CustomHook</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>Set age</button>
    </div>
  );
}

export default App;

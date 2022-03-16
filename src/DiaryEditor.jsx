import React, { useContext, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryEditor = ({}) => {
  const { onCreate } = useContext(DiaryDispatchContext);

  const authorInput = useRef();

  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1,
  });

  const handleState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnsumbit = () => {
    if (state.author.length < 1) {
      alert('최소 1글자 이상 입력해주세요.');
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      authorInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert('저장 성공');

    setState({
      author: '',
      content: '',
      emotion: 1,
    });
  };
  return (
    <div className="dirayEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input ref={authorInput} name="author" onChange={handleState} />
      </div>
      <div>
        <textarea name="content" value={state.content} onChange={handleState} />
      </div>
      <div>
        <select name="emotion" value={state.emotion} onChange={handleState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <button onClick={handleOnsumbit}>일기 저장하기 </button>
    </div>
  );
};

export default DiaryEditor;

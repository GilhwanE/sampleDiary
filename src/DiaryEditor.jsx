import React, { useState } from 'react';

const DiaryEditor = (props) => {
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
    alert('성공');
    console.log(state);
  };
  return (
    <div className="dirayEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input name="author" onChange={handleState} />
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

import React, { useContext, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryItem = ({ author, content, create_date, emotion, id }) => {
  const [isEdit, setIsEdit] = useState(false); //isEdit은 불린값을 가지고 존재하거나 아닐시를 판단
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const localcontentInput = useRef();
  const toggleIsEdit = () => {
    setIsEdit(!isEdit); // 원래있던 isEdit값을 반대로 셋팅한다 .
  };
  const [islocalContent, setIslocalContent] = useState(content); // 수정할내용

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleEdit = () => {
    if (islocalContent.length < 5) {
      localcontentInput.current.focus();
      return;
    }
    onEdit(id, islocalContent);
    toggleIsEdit();
  };

  const handleQuitEdit = () => {
    // 수정취소 버튼을 누르면 수정할때 있었던 컨텐츠 값을 불러오도록하는것,
    setIsEdit(false); // 수정상태에서 나간다.
    setIslocalContent(content);
  };

  return (
    <div className="diaryitem">
      <div className="info">
        <span>
          작성자 : {author} : 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">
          작성시간 : {new Date(create_date).toLocaleDateString()}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localcontentInput}
              value={islocalContent}
              onChange={(e) => setIslocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;

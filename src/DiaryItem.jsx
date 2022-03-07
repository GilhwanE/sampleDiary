import React from 'react';

const DiaryItem = ({ author, content, create_date, emotion, id, onDelete }) => {
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
      <div className="content">{content}</div>
      <button
        onClick={() => {
          if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onDelete(id);
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default DiaryItem;

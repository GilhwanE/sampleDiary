import React from 'react';

const DiaryItem = ({ author, content, create_date, emotion, id }) => {
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
        <div className="content">{content}</div>
      </div>
    </div>
  );
};

export default DiaryItem;

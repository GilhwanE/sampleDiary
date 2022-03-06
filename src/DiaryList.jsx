import React from 'react';

const DiaryList = ({ diarylist }) => {
  return (
    <>
      <div className="diarylist">
        <h2>일기 리스트</h2>
        <h4>{diarylist.length}개의 일기가 있습니다.</h4>
        <div>
          {diarylist.map((it) => (
            <div key={it.id}>
              <div>작성자 : {it.author}</div>
              <div>감정 : {it.emotion}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

DiaryList.defaultProps = {
  diarylist: [],
};
export default DiaryList;

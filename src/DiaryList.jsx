import React, { useContext } from 'react';
import { DiaryStateContext } from './App';
import DiaryItem from './DiaryItem';

const DiaryList = ({}) => {
  const diarylist = useContext(DiaryStateContext);
  return (
    <>
      <div className="diarylist">
        <h2>일기 리스트</h2>
        <h4>{diarylist.length}개의 일기가 있습니다.</h4>
        <div>
          {diarylist.map((it) => (
            <DiaryItem key={`diaryitem_${it.id}`} {...it} />
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

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecylce from './lifecylce';

//https://jsonplaceholder.typicode.com/comments

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());
    console.log(res);
    //원하는 json값만 불러올꺼야 fecth를 통해서

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: 5,
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  // data에 새로운 일기를 추가하는 함수 (일기 데이터를 추가 할 수 있는 함수를 Editor컴포에 전달)
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId); //it.id가 targetId가 아니면
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map(
        (
          it // 원본 데이터 배열에 map함수를 이용하여 모든 요소를 순회하면서 새로운 배열을 만들어서 setData에 전달할꺼야 새로운 배열이란 수정이 완료된 컨텐츠를 말함
        ) => (it.id === targetId ? { ...it, content: newContent } : it) // 모든데이터중에 수정할데이터가 같다면 컨텐츠를 새로운 (수정)컨텐츠 값으로 변경 그게 아니라면 원본
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodCount: 0, badCount: 0, goodRatio: 0 };
    }

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} diarylist={data} onRemove={onRemove} />
    </>
  );
};
export default App;

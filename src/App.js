import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = { ...action.data, created_date };
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map(
        (
          it // 원본 데이터 배열에 map함수를 이용하여 모든 요소를 순회하면서 새로운 배열을 만들어서 setData에 전달할꺼야 새로운 배열이란 수정이 완료된 컨텐츠를 말함
        ) =>
          it.id === action.targetId ? { ...it, content: action.newContent } : it // 모든데이터중에 수정할데이터가 같다면 컨텐츠를 새로운 (수정)컨텐츠 값으로 변경 그게 아니라면 원본
      );
    }

    default:
      return state;
  }
};

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);

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
    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  // data에 새로운 일기를 추가하는 함수 (일기 데이터를 추가 할 수 있는 함수를 Editor컴포에 전달)
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: { author, content, emotion, id: dataId.current },
    });

    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);

  const getDiaryAnalysis = useMemo(() => {
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

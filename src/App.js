import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecylce from './lifecylce';

// const dummylist =
// {
//   id: 1,
//   author: 'hwan',
//   content: '안녕',
//   emotion: 5,
//   create_date: new Date().getTime(),
// },
// {
//   id: 2,
//   author: 'jin',
//   content: '안녕2',
//   emotion: 2,
//   create_date: new Date().getTime(),
// },
// {
//   id: 3,
//   author: 'hyeon',
//   content: '안녕3',
//   emotion: 3,
//   create_date: new Date().getTime(),
// },
// {
//   id: 4,
//   author: 'j',
//   content: '안녕4',
//   emotion: 4,
//   create_date: new Date().getTime(),
// },

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  // data에 새로운 일기를 추가하는 함수 (일기 데이터를 추가 할 수 있는 함수를 Editor컴포에 전달)
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제 되었습니다`);
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

  return (
    <>
      <Lifecylce />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} diarylist={data} onRemove={onRemove} />
    </>
  );
}
export default App;

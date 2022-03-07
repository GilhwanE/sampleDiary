import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

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

  return (
    <>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diarylist={data} />
    </>
  );
}
export default App;

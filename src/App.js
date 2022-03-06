import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummylist = [
  {
    id: 1,
    author: 'hwan',
    content: '안녕',
    emotion: 5,
    create_date: new Date().getTime(),
  },
  {
    id: 2,
    author: 'jin',
    content: '안녕2',
    emotion: 2,
    create_date: new Date().getTime(),
  },
  {
    id: 3,
    author: 'hyeon',
    content: '안녕3',
    emotion: 3,
    create_date: new Date().getTime(),
  },
  {
    id: 4,
    author: 'j',
    content: '안녕4',
    emotion: 4,
    create_date: new Date().getTime(),
  },
];

function App() {
  return (
    <>
      <DiaryEditor />
      <DiaryList diarylist={dummylist} />
    </>
  );
}
export default App;

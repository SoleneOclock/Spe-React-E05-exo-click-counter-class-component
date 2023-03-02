import PlusOneButton from '../PlusOneButton';
import LikesDisplay from '../LikesDisplay';
import LikesInput from '../LikesInput';
import './styles.scss';

function App() {
  return (
    <div className="app">
      <LikesInput />
      <PlusOneButton />
      <LikesDisplay />
    </div>
  );
}

export default App;

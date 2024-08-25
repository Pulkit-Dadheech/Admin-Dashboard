import './App.css';
import Home from "./component/MainPage/Dashboard_Body/Home";
import Header from "./component/MainPage/Main_Header/Header";


function App() {
  return (
    <div className='grid-container'>
      <Header />
      <Home/>
    </div>
  );
}

export default App;

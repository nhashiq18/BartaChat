import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';


function App() {
  return (
    <div className="App">

       <Route path="/" component={Homepage} exact></Route>
       <Route path="/chats" component={ChatPage}></Route>
    </div>
  );
}

export default App;

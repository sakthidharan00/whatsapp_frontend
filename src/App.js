import './App.css';
import { createContext,useContext,useReducer } from 'react';
import Login from './Components/Login/Login';
import { reducer, userDetails } from './Components/Reducer/reducer';


const StateProvider=createContext();


function App() {
  return (
   <StateProvider.Provider value={useReducer(reducer,userDetails)}>
     <Login/>
   </StateProvider.Provider>
    );
};

//useReducer
export const UseStateProvider=()=>useContext(StateProvider);
export default App;

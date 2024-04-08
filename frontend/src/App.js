import { Cursor } from './Components/Curson/Cursor';
import { LangueProvider } from './Context/LangueContext';
import RouterApp from './Router/routerApp';

function App() {
  return (
    <div className="App">
       <LangueProvider>
        <Cursor />
      <RouterApp /> 
      </LangueProvider>
    </div>
  );
}

export default App;

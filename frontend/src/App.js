import { LangueProvider } from './Context/LangueContext';
import RouterApp from './Router/routerApp';

function App() {
  return (
    <div className="App">
       <LangueProvider>
      <RouterApp /> 
      </LangueProvider>
    </div>
  );
}

export default App;

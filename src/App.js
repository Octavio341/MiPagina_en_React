import {BrowserRouter as Router, Routes,Routes} from "react-router-dom";
import Navbar from './componentes/navbar';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <div className='p-4'>
        <Routes>
          <Route path="/" element= {<h1>Inicio</h1>}/>
          <Route path="/acerca" element= {<h1>Acerca</h1>}/>
          <Route path="/contacto" element= {<h1>Contacto</h1>}/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;

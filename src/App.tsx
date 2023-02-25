import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from './Pages/Main';
import { ProdutoCreate } from './Pages/Produto/ProdutoCreate';
import { Conta } from './Pages/Conta';
import { UsuarioCreate } from './Pages/Usuario/UsuarioCreate';
import { Login } from './Pages/Login';
import { Carrinho } from './Pages/Carrinho';
import { db , app} from "./Firebase/Config";

function App() {

  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/produto/create' element={<ProdutoCreate />} />
            <Route path='/minhaconta' element={<Conta />} />
            <Route path='/usuario/create' element={<UsuarioCreate />} />
            <Route path='/login' element={<Login />} />
            <Route path='/meucarrinho' element={<Carrinho />} />
          </Routes>
        </BrowserRouter>
      </div >
  );
}

export default App;
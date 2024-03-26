import { useEffect } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'
  useEffect(() => {
    const fetchPokemonData = async() => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      console.log(res);
    }
    fetchPokemonData()

  }, []) // 1回だけ呼び出したいので第二引数はからの配列※Why?

  return (
    <div className="App">
    </div>
  );
}

export default App;

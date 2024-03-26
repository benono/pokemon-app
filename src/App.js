import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemonData = async() => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      console.log(res);
      setLoading(false)
    }
    fetchPokemonData()

  }, []) // 1回だけ呼び出したいので第二引数はからの配列※Why?

  return (
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <h1>ポケモンデータを取得しました。</h1>
      )}
    </div>
  );
}

export default App;

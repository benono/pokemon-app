import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])

  useEffect(() => {
    const fetchPokemonData = async() => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      console.log('load')
      loadPokemon(res.results);
      console.log(res);
      setLoading(false)
    }
    fetchPokemonData()
  }, []) // 1回だけ呼び出したいので第二引数はからの配列※Why?

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        //console.log(pokemon.url)
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord
      })
    )
    setPokemonData(_pokemonData)
  }
  console.log(pokemonData)

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

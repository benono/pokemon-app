import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  const [nextURL, setNextURL] = useState('')
  const [prevURL, setPrevURL] = useState('')

  useEffect(() => {
    const fetchPokemonData = async() => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      
      loadPokemon(res.results);
      setNextURL(res.next)
      setPrevURL(res.previous)
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
  // console.log(pokemonData)

  const handleNextPave = async () => {
    setLoading(true)
    let data = await getAllPokemon(nextURL)
    await loadPokemon(data.results)
    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false)
  }

  const handlePrePave = async () => {
    if (!prevURL) return
    setLoading(true)
    let data = await getAllPokemon(prevURL)
    await loadPokemon(data.results)
    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false)
  }

  return (
    <>
    <Navbar />
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <div className='pokemonCardContainer'>
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon}></Card>
          })}
        </div>
        <div className='btn'>
          <button onClick={handlePrePave}>前へ</button>
          <button onClick={handleNextPave}>次へ</button>
        </div>
        </>
      )}
    </div>
    </>
  );
}

export default App;

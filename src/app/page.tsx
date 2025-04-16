"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


interface Pokemon {

  name: string;
  url: string;

}

export default function App () {

  const [pokemons, setPokemons] = useState <Pokemon[]> ([]);
  const [isLoading, setIsLoading] = useState (true);
  const [isError, setIsError] = useState (false);

  const handleGetPokemons = async() => {
    
      try{
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      setPokemons(response.data.results)
      }catch{
        setIsError(true);
      }finally{
        setIsLoading(false);
      }
  }

  useEffect (() => {
    handleGetPokemons();
  }, []);

  return (

    <div>

      <div className="mx-auto w-64 mt-10 text-4xl">
      <h1 className="">Pokemons list</h1>
      </div>
      
      <div className="grid grid-cols-4 gap-2 ml-3.5">

        {isLoading ? <h1>cargando</h1> : null}

        {pokemons.map((pokemon, index) => (

          <Link href={`/pokemon/${index + 1}`} key={pokemon.name}>

              <div className="text-3xl text-center font-semibold" key={`${pokemon}-${index}`}>

             <img className="max-w-96" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
             index + 1}.png`}/>

             <h1>{pokemon.name}</h1>
             <h2>{(index+1).toString().padStart(3, "0")}</h2>

            </div> 
          
          </Link>

            
        ))}
      </div>

      {isError ? <h1>Ocurrió un error</h1> : null}

    </div>

  )



}
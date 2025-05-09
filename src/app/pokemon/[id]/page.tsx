interface Pokemon {
  id: number;
  name: string;
  types: {
    type: { name: string };
  }[];
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: string;
      };
    };
  };
}

export default async function PokemonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: Pokemon = await res.json();

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={`Imagen de ${pokemon.name}`}
        className="w-64 mx-auto"
      />
      <p className="mt-4">ID: {pokemon.id}</p>
      <p>
        Tipo(s): {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
    </div>
  );
}
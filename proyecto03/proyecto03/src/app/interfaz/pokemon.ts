interface PokemonRes{
    count:number;
    next:string;
    previous: any;
    results: any[];
}

interface Pokemon{
    name: string;
    url: string;
}


interface PokemonStat{

    abilities: any;
    base_experience: number;
    forms: any;
    game_indices: any;
    height: number;
    held_items: any;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any[];
    name: string;
    order: number;
    past_types: any;
    species: any;
    sprites: any;
    stats: any;
    types: any[];
    weight: number;
}

export {PokemonRes,Pokemon, PokemonStat}
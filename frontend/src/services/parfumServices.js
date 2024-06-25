import { sample_Tags, sample_parfums } from "../data";

export const getAll = async () => sample_parfums;



export const search =  async searchTerm => 
    sample_parfums.filter (item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    export const getAllTags = async () => sample_Tags;

    export const getAllByTag = async tag => {
        if ( tag === 'All') return getAll();
        return sample_parfums.filter(item => item.tags?.includes(tag));
    };

    export const getById = async parfumId => 
        sample_parfums.find(item => item.id === parfumId);

import axios from "axios";

export const getAll = async () => {
    const {data} = await axios.get('/api/parfums');
    return data;
};



export const search =  async searchTerm => 
    {
        const{data} =await axios.get('/api/parfums/search/'+ searchTerm);
        return data;
    };


    export const getAllTags = async () => {
        const {data} = await axios.get('/api/parfums/tags');
        return data;
    };

    export const getAllByTag = async tag => {
        if ( tag === 'All') return getAll();
        const {data} = await axios.get('/api/parfums/tag/'+ tag);
        return data;
    };

    export const getById = async parfumId => {
        const {data} = await axios.get('/api/parfums/' + parfumId);
        return data;
    };
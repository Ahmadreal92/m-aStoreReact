
import axios from "axios";

export const getAll = async () => {
    try { 
        const {data} = await axios.get('/api/parfums');
    return data;
} catch (error){
    console.log(error);
     }
};



export const search =  async searchTerm => 
    {
        const{data} =await axios.get('/api/parfums/search/'+ searchTerm);
        return data;
    };


    export const getAllTags = async () => {
        try {
            const {data} = await axios.get('/api/parfums/tags');
        return data;
    } catch (error){
       console.log(error);
        }
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
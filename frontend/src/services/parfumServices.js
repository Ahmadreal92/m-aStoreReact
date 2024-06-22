import { sample_parfums } from "../data";

export const getAll = async () => sample_parfums;



export const search =  async searchTerm => 
    sample_parfums.filter (item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
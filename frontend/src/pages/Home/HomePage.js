import React, { useEffect, useReducer } from "react";
import { getAll, getAllByTag, getAllTags, search } from "../../services/parfumServices";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Tags from "../../components/Tags/Tags";
import NotFound from "../../components/NotFound/NotFound";



const initialState = { parfums: [], tags: [] };
const reducer = (state, action) => {
    switch (action.type) {
        case 'PARFUMS_LOADED':
            return { ...state, parfums: action.payload };
        case 'TAGS_LOADED':
            return { ...state, tags: action.payload };
        default:
            return state;
    }
}
export default function HomePage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { parfums, tags } = state;

    const { searchTerm, tag } = useParams();

    useEffect(() => {
        getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));
        const loadParfums =
            tag ? getAllByTag(tag) :
                searchTerm
                    ? search(searchTerm)
                    : getAll();

        loadParfums.then(parfums => 
            dispatch({ type: 'PARFUMS_LOADED', payload: parfums })

        );
        
    }, 
    [searchTerm, tag]);
    return (
        <>
            <Search />
            <Tags tags={tags} />
            {parfums?.length === 0 && <NotFound linkText = "Reset Search"/>}
            <Thumbnails parfums={parfums} />
        </>
    );
}
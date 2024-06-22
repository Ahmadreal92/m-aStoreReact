import React, { useEffect, useReducer } from "react";
import { getAll , search} from "../../services/parfumServices";
import { type } from "@testing-library/user-event/dist/type";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";



const initialState = {parfums:[]};
const reducer = (state, action) => {
    switch (action.type) {
        case 'PARFUMS_LOADED':
            return {...state, parfums:action.payload};
            default: 
            return state;
    }
}
export default function HomePage(){
    const [state,dispatch] = useReducer(reducer, initialState);
    const {parfums} =state;

    const{searchTerm} = useParams();

    useEffect (() =>{
        const loadParfums = searchTerm? search(searchTerm) : getAll();

        loadParfums.then(parfums => dispatch ({type: 'PARFUMS_LOADED',payload: parfums})

        )
     getAll().then(parfums => dispatch({type:'PARFUMS_LOADED',payload:parfums}));
    }, [searchTerm]);
    return (
    <>
    <Search />
    <Thumbnails parfums ={parfums} />
    </>
    );
}
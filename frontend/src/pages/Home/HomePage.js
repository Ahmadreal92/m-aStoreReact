import React, { useEffect, useReducer } from "react";
import { getAll } from "../../services/parfumServices";
import { type } from "@testing-library/user-event/dist/type";
import Thumbnails from "../../components/Thumbnails/Thumbnails";



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

    useEffect (() =>{
getAll().then(parfums => dispatch({type:'PARFUMS_LOADED',payload:parfums}));
    }, []);
    return (
    <>
    <Thumbnails parfums ={parfums} />
    </>
    );
}
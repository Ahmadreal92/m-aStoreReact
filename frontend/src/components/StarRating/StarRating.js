import React from 'react';
import classes from './starRating.module.css';



export default function StarRating ({stars, size}) {
    const styles = {
        width :size +'px',
        height : size +'px',
        marginRoght:size /6 +'px',
    };

    function Star({number}) {
        const halfNumber = number -0.5;
        return stars >= number?(
        <img src ='frontend\public\Red_star.svg.png' style ={styles} alt={number}/>
         ) : stars >= halfNumber ? (
        <img src ='frontend\public\halffull.png' style ={styles} alt={number}/>
         ):(
         <img src ='frontend\public\empty.png' style ={styles} alt={number}/>
         );
    }

    return <div className={classes.rating}>
        {[1,2,3,4,5].map(number => (
        <Star key = {number}  number={ number}/>
        ))}
    </div>
}


StarRating.defultProps ={
    size : 18,
};
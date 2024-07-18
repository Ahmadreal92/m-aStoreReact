import React from "react";
import classes from './thumbnails.module.css'
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import Price from '../Price/Price';
export default function Thumbnails({ parfums }) {
    return (
        <ul className={classes.list}>

            {parfums?.map(parfum => (
                <li key={parfums.id}>
                    <Link to={`/parfum/${parfum.id}`}>
                        <img
                            className={classes.image}
                            src={`${parfum.imageUrl}`}
                            alt={parfums.name}
                        />
                    



                    <div className={classes.content}>
              <div className={classes.name}>{parfum.name}</div>
                        <span className={`${classes.favorite}${parfum.favorite ? '' : classes.not}`}>


                            ❤
                        </span>
                      <div className={classes.stars}>
                        <StarRating stars={parfum.stars} />
                      </div>
                     
                     <div className={classes.product_item_footer}>
                        <div className={classes.origins}>
                            {parfum.origins?.map(origin=> (
                                <span key={origin}>{origin}</span>
                            ))}
                        </div>
                        
                     </div>

                         <div className={classes.price} >
                            <Price price ={parfum.price} />
                         </div>

                    </div>
                    </Link>
                </li>

            ))}
        </ul>
    );
}
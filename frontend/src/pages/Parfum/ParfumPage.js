import React, { useEffect, useState } from 'react'
import classes from './parfumPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/parfumServices';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import Price from '../../components/Price/Price';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../components/NotFound/NotFound';




export default function ParfumPage() {
    const [parfum, setParfum] = useState({});
    const { id } = useParams();
    const {addToCart} = useCart ();
    const navigate =useNavigate();
const handleAddToCart = () => {
    addToCart(parfum);
navigate('/cart');
}

    useEffect(() => {
        getById(id).then(setParfum);
    }, [id]);
    return (
    <>
        {!parfum? (<NotFound message="Parfum Not Found" linkText="Back to Home Page"/>
        ) : (
            <div className={classes.container}>
            <img className={classes.img}
                src={`/parfums/${parfum.imageUrl}`}
                alt={parfum.name} />

            <div className={classes.details}>
                <div className={classes.header}>
                    <span className={classes.name}>
                        {parfum.name}</span>
                    <span
                        className={`${classes.favorite} 
                        ${parfum.favorite ? '' : classes.not}`}>
                        ❤
                    </span>
                </div>
                <div className={classes.rating}>
                    <StarRating stars={parfum.stars} size={25} />

                </div>

                <div className={classes.origins}>
                    {parfum.origins?.map(origin => (
                        <span key={origin}>
                            {origin}
                        </span>
                    ))}
                </div>

                <div className={classes.tags}>
                    {parfum.tags && (
                        <Tags
                            tags={parfum.tags.map(tag =>
                                 ({ name: tag }))}
                            forParfumPage={true} />
                    )}
                </div>

                <div className={classes.price}>
                    <Price price={parfum.price} />
                </div>

                <button onClick={handleAddToCart}>Add to Cart</button>


            </div>
        </div>
        )}
    </>
    );
}

import React from 'react'
import classes from './tags.module.css'
import { Link } from 'react-router-dom'





export default function Tags({ tags, forPArfumPage: forParfumPage }) {
    return (
        <div className={classes.container}
            style={{
                justifyContent: forParfumPage ? 'start' : 'center'
            }}
        >
            {tags.map(tag => (
                <Link key={tag.name} to={`/tag/${tag.name}`}>
                    {tag.name}
                    {!forParfumPage && `(${tag.count})`}
                </Link>
            ))}
        </div>
    );
}

import { Rating } from "@mui/material";

export function Review({ text, author, rating }) {

    return (
        <div className="review-container">
            <p>{text}</p>
            <Rating name="read-only" value={rating} readOnly size="small"/>
            <h1>{author}.</h1>
        </div>
    )
}
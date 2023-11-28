import { Review } from "./Review";

export function CheckoutReviews() {

    return (
        <div className="checkout-reviews">
            <h1 className="reviews-title">Reviews From Customers</h1>
            <div className="reviews-list">
                <Review
                    text={'By far the most comfortable clothes label I’ve ever worn. Perfect for long travels.'}
                    author={'Gal Barcessat'}
                    rating={5} />
                <Review
                    text={'The colors exactly what I was looking for! I would definitely order again.'}
                    author={'Eric Rowen'}
                    rating={5} />
                <Review
                    text={'This was my first order and I was super pleased. Quick service at a good price.'}
                    author={'Ardell'}
                    rating={4} />
            </div>
        </div>
    )
}
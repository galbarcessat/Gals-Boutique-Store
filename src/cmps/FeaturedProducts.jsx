import { useEffect, useState } from "react"
import { ProductsList } from "./ProductsList"

export function FeaturedProducts({ getFeaturedProducts }) {
   
    return (
        <section className="featured-section">
            <div className="categories-section-heading">
                <div>
                    <h1>Featured Products</h1>
                    <p>Most trending items for all days view</p>
                </div>
                <span>See all products <svg className="arrow-icon" width="16" height="12" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z" fill="#323338"></path></svg></span>
            </div>
            <div className="featured-products-container">
                <ProductsList products={getFeaturedProducts()} />
            </div>
        </section>
    )
}
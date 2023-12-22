import { ProductPreview } from "./ProductPreview";

export function ProductsList({ products }) {
// console.log('products:', products)

if(products.length === 0) return <div>No products to show!</div>
    return (
        <div className="products-list-container">
            {products.map(product => (
                <ProductPreview product={product} key={product._id} />
            ))}
        </div>
    )
}
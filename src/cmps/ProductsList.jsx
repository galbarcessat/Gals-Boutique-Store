import { ProductPreview } from "./ProductPreview";

export function ProductsList({ products }) {
// console.log('products:', products)

    return (
        <div className="products-list-container">
            {products.map(product => (
                <ProductPreview product={product} key={product.id} />
            ))}
        </div>
    )
}
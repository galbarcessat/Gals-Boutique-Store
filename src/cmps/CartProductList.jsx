import { CartProductPreview } from "./CartProductPreview"

export function CartProductList({ cartProducts }) {

    return (
        <>
            {cartProducts.map(product => <CartProductPreview key={product.id} product={product} />)}
        </>
    )
}
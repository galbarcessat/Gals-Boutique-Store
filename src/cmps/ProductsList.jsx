import { ProductPreview } from "./ProductPreview";
import Loader from '../assets/imgs/Loader.gif'
import { useSelector } from "react-redux";
import { LoadingScreen } from "./LoadingScreen";
export function ProductsList({ products }) {
    const user = useSelector(state => state.userModule.user)
    // console.log('products:', products)

    if (!products) return <LoadingScreen />
    else if (products.length === 0) return <div>No products to show!</div>
    return (
        <div className="products-list-container">
            {products.map(product => (
                <ProductPreview key={product._id} product={product} isAdmin={user?.isAdmin} />
            ))}
        </div>
    )
}
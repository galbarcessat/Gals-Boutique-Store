import { ProductPreview } from "./ProductPreview";
import Loader from '../assets/imgs/Loader.gif'
import { useSelector } from "react-redux";

export function ProductsList({ products }) {
    // console.log('products:', products)
    const user = useSelector(state => state.userModule.user)

    if (!products) return <div className='loader-container'>
        <img src={Loader} alt="" />
    </div>
    else if (products.length === 0) return <div>No products to show!</div>
    return (
        <div className="products-list-container">
            {products.map(product => (
                <ProductPreview key={product._id} product={product} isAdmin={user.isAdmin} />
            ))}
        </div>
    )
}
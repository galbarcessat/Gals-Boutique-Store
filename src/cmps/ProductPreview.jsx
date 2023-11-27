import { useNavigate } from 'react-router-dom'
import { addToCart } from '../store/actions/board.action'

export function ProductPreview({ product }) {
    const navigate = useNavigate()

       return (
        <div className="product-preview-container" onClick={() => navigate(`/product/${product.id}`)}>
            <img src={product.images[0]} alt="" />
            <h1>{product.title}</h1>
            <p>{product.price}$</p>
            <div className="watch-product-btn">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="35" viewBox="0 0 32 32" fill="black">
                    <path d="M16 6.404c-5.847 0-10.404 3.66-15.994 9.593 4.816 5.073 8.857 9.6 15.994 9.6s12.382-5.73 15.994-9.492c-3.697-4.407-8.943-9.7-15.994-9.7zM16 24.53c-6.336 0-10.16-3.929-14.524-8.532 5.192-5.414 9.32-8.527 14.524-8.527 6.161 0 10.975 4.443 14.558 8.591-3.523 3.674-8.293 8.469-14.558 8.469z"></path>
                    <path d="M16 9.603c-3.528 0-6.398 2.87-6.398 6.397s2.87 6.397 6.398 6.397 6.398-2.87 6.398-6.397-2.87-6.397-6.398-6.397zM16 21.331c-2.939 0-5.331-2.391-5.331-5.331s2.392-5.331 5.331-5.331 5.331 2.391 5.331 5.331c0 2.939-2.392 5.331-5.331 5.331z"></path>
                    <path d="M16 12.268c-2.058 0-3.732 1.674-3.732 3.732s1.674 3.732 3.732 3.732c2.058 0 3.732-1.674 3.732-3.732s-1.674-3.732-3.732-3.732zM16 18.666c-1.47 0-2.666-1.196-2.666-2.666s1.196-2.666 2.666-2.666 2.666 1.196 2.666 2.666c0 1.47-1.196 2.666-2.666 2.666z"></path>
                </svg>
            </div>
            <button onClick={(event) => addToCart(event,product)}>Add to cart</button>
        </div>
    )
}
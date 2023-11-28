import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart, getProductById } from '../store/actions/board.action'
import { UserMsg } from '../cmps/UserMsg'

export function ProductDetails() {
    const [currProduct, setCurrProduct] = useState(null)
    const [mainImg, setMainImg] = useState(null)
    const { productId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        let product = getProductById(parseInt(productId))
        if (product) {
            setCurrProduct(product)
            setMainImg(product.images[0])
        }
    }, [productId])

    if (!currProduct) return <div>Loading...
        <button onClick={() => navigate('/')}>Back to shopping</button>
    </div>

    return (
        <div className="product-details-container main-layout">
            <UserMsg />
            <div className='product-details-inner-container'>
                <div className='images-container'>
                    <img className='main-product-image' src={mainImg} alt="" />
                    <div className='all-product-images'>
                        {currProduct.images.map(imgUrl => <img onClick={() => setMainImg(imgUrl)} key={imgUrl} src={imgUrl} alt="" />)}
                    </div>
                </div>
                <div className='product-details-text' data-aos="fade-up" data-aos-easing="ease-in-out" >
                    <h1>{currProduct.title}</h1>
                    <p>{currProduct.description}</p>
                    <p>Category : {currProduct.category.name}</p>
                    <p>Price : {currProduct.price}$</p>
                    <button onClick={(event) => addToCart(event, currProduct)}>Add to cart</button>
                    <button onClick={() => navigate('/product')}>Back to shopping</button>
                </div>
            </div>
        </div>
    )
}
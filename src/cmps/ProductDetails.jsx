import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../store/actions/board.action'

export function ProductDetails() {
    const [currProduct, setCurrProduct] = useState()
    const { productId } = useParams()

    useEffect(() => {
        let product = getProductById(parseInt(productId))
        setCurrProduct(product)
    }, [productId])


    if (!currProduct) return <div>Loading...</div>
    return (
        <div className="product-details-container main-layout">
            <div className='product-details-inner-container'>

                <img src={currProduct.images[0]} alt="" />
                <div className='product-details-text'>
                    <h1>{currProduct.title}</h1>
                    <p>{currProduct.description}</p>
                    <p>Category : {currProduct.category.name}</p>
                    <p>Price : {currProduct.price}$</p>
                    <button>Add to cart</button>
                </div>
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart, getProductById, updateProduct } from '../store/actions/board.action'
import { UserMsg } from '../cmps/UserMsg'
import { LoadingScreen } from '../cmps/LoadingScreen'
import { useSelector } from 'react-redux'
import { TextField, TextareaAutosize } from '@mui/material'

export function ProductDetails() {
    const user = useSelector(state => state.userModule.user)
    const [currProduct, setCurrProduct] = useState(null)
    const [mainImg, setMainImg] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const { productId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        let product = getProductById(productId)
        if (product) {
            setTimeout(() => {
                setCurrProduct(product)
                setMainImg(product.images[0])
            }, 1500);

        }
    }, [productId])

    function onSaveProduct() {
        console.log('save:')
        updateProduct(currProduct)
        setIsEdit(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        let value = ev.target.value
        if (field === 'price') {
            value = +value
        }
        setCurrProduct({ ...currProduct, [field]: value })
    }

    const dynEditSaveBtn = isEdit ?
        <button onClick={() => onSaveProduct()}>Save</button>
        :
        <button onClick={() => setIsEdit(true)}>Edit</button>

    if (!currProduct) return <LoadingScreen />
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
                    {!isEdit ?
                        <>
                            <h1>{currProduct.title}</h1>
                            <p>{currProduct.description}</p>
                            <p>Category : {currProduct.category.name}</p>
                            <p>Price : {currProduct.price}$</p>
                        </>
                        :
                        <>
                            <TextField
                                variant="standard"
                                name='title'
                                value={currProduct.title}
                                InputProps={{
                                    style: { fontSize: '2rem' },
                                }}
                                onChange={handleChange}
                            />
                            <p>
                                <TextareaAutosize
                                    style={{
                                        maxWidth: '700px',
                                        fontSize: '16px',
                                    }}
                                    variant="standard"
                                    name='description'
                                    value={currProduct.description}
                                    onChange={handleChange}
                                />
                            </p>

                            <p>Category : {currProduct.category.name}</p>
                            <p style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem'
                            }}>Price :
                                <TextField
                                    InputProps={{
                                        style: { fontSize: '1.1rem' },
                                    }}
                                    variant="standard"
                                    name='price'
                                    value={currProduct.price}
                                    onChange={handleChange}
                                />
                                $
                            </p>
                        </>
                    }
                    {user?.isAdmin && dynEditSaveBtn}
                    <button onClick={(event) => addToCart(event, currProduct)}>Add to cart</button>
                    <button onClick={() => navigate('/product')}>Back to shopping</button>
                </div>
            </div>
        </div>
    )
}
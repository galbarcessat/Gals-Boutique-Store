import { useNavigate } from 'react-router-dom'
import { addToCart, deleteProduct } from '../store/actions/board.action'
import { Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';

export function ProductPreview({ product, isAdmin }) {
    const navigate = useNavigate()

    async function onDeleteProduct(ev, productId) {
        ev.stopPropagation()
        try {
            deleteProduct(productId)
            showSuccessMsg(`Deleted product ${product._id}`)
        } catch (error) {
            showErrorMsg(`Had error deleting product ${product._id}`)
        }
    }

    return (
        <div className="product-preview-container" onClick={() => navigate(`/product/${product._id}`)}>
            <div className='image-container'>
                <img src={product.images[0]} alt="" />
                <div className='product-preview-btns'>
                    <Tooltip title="Watch" placement="left" arrow>
                        <VisibilityIcon className='product-btn' />
                    </Tooltip>
                    {isAdmin &&
                        <>
                            <Tooltip title="Delete" placement="left" arrow>
                                <DeleteOutlineOutlinedIcon className='product-btn' onClick={(ev) => onDeleteProduct(ev, product._id)} />
                            </Tooltip>
                            <Tooltip title="Edit" placement="left" arrow>
                                <EditOutlinedIcon className='product-btn' />
                            </Tooltip>
                        </>
                    }

                </div>
                <button onClick={(event) => addToCart(event, product)}>Add to cart</button>
            </div>
            <h1>{product.title}</h1>
            <p>{product.price}$</p>

        </div>
    )
}
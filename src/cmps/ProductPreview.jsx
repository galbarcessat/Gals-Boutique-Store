import { useNavigate } from 'react-router-dom'
import { addToCart } from '../store/actions/board.action'
import { Tooltip } from '@mui/material';
import { Modal } from '@mui/base/Modal';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

export function ProductPreview({ product, isAdmin }) {
    const navigate = useNavigate()

    return (
        <div className="product-preview-container" onClick={() => navigate(`/product/${product._id}`)}>
            <div className='image-container'>
                <img src={product.images[0]} alt="" />
                <div className='product-preview-btns'>
                    <Tooltip title="Watch" placement="left" arrow>
                        <VisibilityIcon className='product-btn'/>
                    </Tooltip>

                    {isAdmin &&
                        <>
                            <Tooltip title="Delete" placement="left" arrow>
                                <DeleteOutlineOutlinedIcon className='product-btn' />
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
import { useState, useRef } from "react"
import { addProduct } from "../store/actions/board.action"
import { useNavigate } from "react-router-dom"
import { UploadFilesBox } from "./uploadFilesBox"

export function AddProductPage() {
    const [newProduct, setNewProduct] = useState({ title: '', description: '', category: '', price: '', images: [] })
    const navigate = useNavigate()

    function saveFiles(files) {
        if (files.length > 0) {
            setNewProduct((prevNewProduct) => {
                const updatedImages = [...prevNewProduct.images]

                for (let i = 0; i < files.length; i++) {
                    if (files[i].type.split('/')[0] !== 'image') continue
                    if (!updatedImages.some((image) => image === files[i].url)) {
                        updatedImages.push(
                            URL.createObjectURL(files[i]),
                        )
                    }
                }

                return { ...prevNewProduct, images: updatedImages }
            })
        }
    }

    async function onSaveProduct(ev) {
        ev.preventDefault()
        let productToSave = newProduct
        productToSave = { ...productToSave, category: { name: productToSave.category } }
        if (productToSave.images.length === 0) {
            productToSave.images.push("https://agrimart.in/uploads/vendor_banner_image/default.jpg")
        }
        let savedProduct = await addProduct(productToSave)
        navigate(`/product/${savedProduct._id}`)
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setNewProduct((prevNewProduct) => ({ ...prevNewProduct, [field]: value }))
    }

    return (
        <div className="add-product-page main-layout">
            <h1>New product</h1>
            <form onSubmit={onSaveProduct} className="inner-container">
                <div className="left-container">
                    <div>
                        <label htmlFor="title">Product Name</label>
                        <input required type="text" name="title" id="title" placeholder="Product name" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select required name="category" id="category" value={newProduct.category} onChange={handleChange}>
                            <option value='' disabled hidden>Choose category</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <input required type="number" name="price" id="price" placeholder="Enter price" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea required name="description" id="description" rows="12" placeholder="Enter description" onChange={handleChange}>
                        </textarea>
                    </div>
                </div>

                <div className="right-container">
                    <UploadFilesBox setNewProduct={setNewProduct} newProduct={newProduct} />
                    <button className="btn-save-product">Save product</button>
                </div>
            </form>
        </div>
    )
}

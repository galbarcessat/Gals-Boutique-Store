import { useRef, useState } from "react"

export function UploadFilesBox({ setNewProduct, newProduct }) {
    const [isDragging, setIsDragging] = useState(false)
    const filesInputRef = useRef(null)

    function selectFiles() {
        filesInputRef.current.click()
    }

    function onFilesSelect(event) {
        const files = event.target.files
        saveFiles(files)
    }

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

    function deleteImage(index) {
        setNewProduct((prevNewProduct) => {
            const updatedImages = prevNewProduct.images.filter((image, i) => i !== index)
            return { ...prevNewProduct, images: updatedImages }
        })
    }
    function onDragOver(event) {
        event.preventDefault()
        setIsDragging(true)
        event.dataTransfer.dropEffect = "copy"
    }

    function onDragLeave(event) {
        event.preventDefault()
        setIsDragging(false)
    }

    function onDrop(event) {
        event.preventDefault()
        setIsDragging(false)
        const files = event.dataTransfer.files
        saveFiles(files)
    }

    return (
        <div className="card">
            <div className="top">
                <p>Drag & Drop product images</p>
            </div>
            <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ?
                    (<span className="select">
                        Drop images here
                    </span>)
                    :
                    (<>
                        Drag & Drop images here or {" "}
                        <span className="select" role="button" onClick={selectFiles}>
                            Browse
                        </span>
                    </>
                    )}

                <input type="file" name="file" className="file" multiple ref={filesInputRef} onChange={onFilesSelect} />
            </div>
            <div className="container">
                {newProduct.images.map((image, index) => (
                    <div className="image" key={index}>
                        <span className="delete" onClick={() => deleteImage(index)}>
                            &times;
                        </span>
                        <img src={image} alt={image} />
                    </div>
                ))}
            </div>
        </div>
    )
}

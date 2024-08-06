import { useState } from 'react'
import PostImg from '../../assets/svgs/img.svg'
import { ModalImgBtn } from '../ModalWindow/ModalWindow.styled'

const UploadAndDisplayImage = ({ setImage }) => {
  // Define a state variable to store the selected image
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])

  const handleImageUpload = (event) => {
    // Update the state with the selected file
    const files = Array.from(event.target.files)
    console.log('🚀 ~ handleImageUpload ~ files:', files)
    setImageFiles(files)
    setImage(files)

    // Create image preview URLs
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setImages(imageUrls)
  }
  const handleButtonClick = () => {
    document.getElementById('fileInput').click()
  }

  return (
    <div>
      <input
        id="fileInput"
        type="file"
        multiple
        onChange={handleImageUpload}
        className="hidden-file-input"
        style={{ display: 'none' }}
      />
      <ModalImgBtn className="custom-button" onClick={handleButtonClick}>
        <img src={PostImg} alt="Choose an image" />
      </ModalImgBtn>
      <div className="image-preview-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index}`}
            style={{ width: '100px', height: '100px' }}
            className="image-preview"
          />
        ))}
      </div>
    </div>
  )
}
export default UploadAndDisplayImage

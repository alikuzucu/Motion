import { EditImgBtn } from "../../routes/Profiles/EditProfile.styled"

const AvatarUploader = ({ updateAvatar }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      updateAvatar(file)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    document.getElementById('fileInput').click()
  }

  return (
    <div>
      <input
        id="fileInput"
        type="file"
        onChange={handleImageUpload}
        className="hidden-file-input"
        style={{ display: 'none' }}
      />
      <EditImgBtn className="custom-button" onClick={handleButtonClick}>
        Update Image
      </EditImgBtn>
    </div>
  )
}

export default AvatarUploader

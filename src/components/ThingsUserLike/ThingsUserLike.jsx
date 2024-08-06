import { LikedThing, LikedThingBtn } from "../../routes/Profiles/EditProfile.styled"

const ThingsUserLike = ({ element, updateThingsILike }) => {
  const removeItem = () => {
    updateThingsILike(element)
  }

  return (
    <LikedThing>
      <div>{element}</div>
      <LikedThingBtn type="button" onClick={removeItem}>
        X
      </LikedThingBtn>
    </LikedThing>
  )
}
export default ThingsUserLike

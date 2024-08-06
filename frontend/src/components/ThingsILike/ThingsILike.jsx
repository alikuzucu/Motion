const thingsILike = ({ thingsarr }) => {
  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <div>Things I like</div>
        {thingsarr.length ? <div>Test</div> : null}
      </div>
      <input type="text" />
      <button type="submit">ADD</button>
    </form>
  )
}

export default thingsILike

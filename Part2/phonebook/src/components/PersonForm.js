

const PersonForm = ({ 
  funcSubmit, 
  funcChangeName, 
  funcChangeNumber, 
  newName,
  newNumber
}) => {
  return (
    <form onSubmit={funcSubmit}>
      <div>
        name: <input onChange={funcChangeName} value={newName} />
      </div>
      <div>
        number: <input onChange={funcChangeNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
import { useState } from "react"

export const useFild = ( type ) => {
  const [value, setValue] = useState('')

  const onChange = (e = null) => {
    if (e === null) {
      setValue('')
    }
    else {
      setValue(e.target.value)
    }
  }

  return {
    type, value, onChange
  }
}
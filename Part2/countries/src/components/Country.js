import React, { useState } from "react";
import Button from "./Button";
import CountryInfo from "./CountryInfo";

const Country = ({ country }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      {
        show
          ?
          <>
            <CountryInfo country={country} />
            <Button show={show} setShow={setShow} />
          </>
          :
          <div>
            {country.name.common} <Button show={show} setShow={setShow} />
          </div>
      }
    </>
  )
}

export default Country
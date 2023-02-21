import React from 'react'


function Newsletters() {

  const Newsletters = [
    "Garden club newsletter February 2021 -.pdf",
    "Garden club newsletter March 2021.pdf",
    "Garden club newsletter April 2021.pdf",
    "Garden club newsletter May 2021.pdf",
    "Garden club newsletter June 2021.pdf",
    "Garden club newsletter July 2021.pdf",
    "Garden club newsletter August 2021.pdf",
    "Garden club newsletter September 2021.pdf",
    "Garden club newsletter October 2021.pdf",
    "Garden club newsletter November  2021.pdf",
    "Garden club newsletter December  2021.pdf",
  ]

  return (
    <div>
      <h1>Newsletters</h1> 

      {Newsletters.map((a) => {
        return (
          <>
            <a target="_blank" href={"/documentation/newsletter/" + a}>{a}</a>
            <br/>
          </>

        )
      })}
      
    </div>
  )
}

export default Newsletters
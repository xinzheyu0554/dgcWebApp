import React from 'react'
function Gallery() {
    const imageArray = ['image/20200915_160139.jpg',
    'image/20210623_122500.jpg',
    'image/20211211_102813.jpg',
    'image/20220304_081057.jpg',
    'image/20220322_221346.jpg',
    'image/20220509_162250.jpg',
    'image/20220816_163844.jpg',
    'image/20220905_160633.jpg',
    'image/20221019_180141.jpg']

  return (
    <div style={{margin:"10px"}}>
        <div style={{padding:"10px"}}>
                    <h1>Gallery</h1>
                    <div className="pp-gallery">
    <div className="card-columns">     
        {imageArray.map((a) => {
            return (
                <div className="card1">
                <figure className="pp-effect">
                    <a href={a} target="_blank" rel="noreferrer"><img className="img-fluid" src={a} alt={a}/></a>
                    {/* <figcaption>
                    <div class="h4">Clota Cottage Neighbourhood House</div>
                    </figcaption> */}
                </figure>
                </div>
            )
        })}

        </div>
        </div>
        </div>

    </div>
  )
}

export default Gallery
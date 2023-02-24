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
        {imageArray.map((a) => {
            return (
                <div class="gallery">
                <a href={a}>
                    <img src={a} alt="Cinque Terre" width="600" height="400"></img>
                </a>
                <div class="desc">Add a description of the image here</div>
                </div>
            )
        })}
        </div>

    </div>
  )
}

export default Gallery
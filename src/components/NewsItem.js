import React from 'react'

const NewsItem =(props)=>{
    let {title,description,imageUrl,newsUrl,author,date} = props
    return (
      <div>
        <div className="card">
              <img src={!imageUrl?"https://img.etimg.com/thumb/msid-100667922,width-1070,height-580,imgsize-24476,overlay-etmarkets/photo.jpg":imageUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {!author?'Unknown':author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} rel="noreferrer" target = "_blank" className= "btn btn-sm btn-dark">Read More</a>
              </div>
        </div>
      </div>
    )
}

export default NewsItem
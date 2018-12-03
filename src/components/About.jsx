import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-col-start">
        <img className="about-img" src="https://s3-us-west-1.amazonaws.com/nvodoor-images/bike-share-docking-station.jpg" alt="bikeshare image"  width="200" height="200"/>
      </div>
      <div className="about-col-mid">
        <h1 className="about-heading">About Bike Share Review:</h1>
        <p className="about-para">Bike Share Review was founded in the year 2018 as an application for the bike sharing community in the world. The goal of this app is to enable bike sharers to look up reviews of bike shares within their local community. These reviews are going to be provided from fellow bike sharers, so the reviews of bike shares on this site will be done by your fellow peers.</p>
        <p className="about-para">Right now, we are aiming to debut this application in only a few select cities in the United States. Expansion will follow as time permits.</p>
      </div>
      <div className="about-col-end">
        <img className="about-img-end" src="https://s3-us-west-1.amazonaws.com/nvodoor-images/bikeshare.jpeg" alt="bikeshare image" width="200" height="200" />
      </div>
    </div>
  )
}

export default About;
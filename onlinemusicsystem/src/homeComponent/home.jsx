import React from 'react';
import './home.css';
import Carousel from 'react-bootstrap/Carousel'
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';

function home(props) {
    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                <Carousel fade={true} pause={false} controls={false} indicators={false}>
                    <Carousel.Item interval={2500}>
                        <img
                            className="d-block w-100"
                            src={img1}
                            alt="First slide"
                            height="595px"
                        />
                    </Carousel.Item>

                    <Carousel.Item interval={2500}>
                        <img
                        className="d-block w-100"
                        src={img2}
                        alt="Second slide"
                        height="595px"
                        />
                    </Carousel.Item>

                    <Carousel.Item interval={2500}>
                        <img
                        className="d-block w-100"
                        src={img3}
                        alt="Third slide"
                        height="595px"
                        />
                    </Carousel.Item>
                </Carousel>
        </div>
    );
}

export default home;

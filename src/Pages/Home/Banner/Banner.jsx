import React, { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';




const Banner = () => {
    const [img, setImg] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setImg(data))

    }, [])

    return (
        <Carousel>
            {
                img.slice(0, 6).map
                    (
                        (item) =>
                        (
                            <div key={item._id}>
                                <img src={item.image_url} alt={item.title} />
                            </div>
                        )
                    )
            }

        </Carousel>
    );
};

export default Banner;
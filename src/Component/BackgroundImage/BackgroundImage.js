import { Fade } from 'react-slideshow-image';

import Image1 from '../../assest/hero/nike2.jpg'
import Image2 from '../../assest/hero/adidas.jpg'
const ImageList = [
    {
        id: 1,
        image: Image1,
    },
    {
        id: 2,
        image: Image2,
    },
]

function BackgroundImage() {
    return (
        <div >
            <div className="">
                <Fade>
                    {ImageList.map((slideImage, index) => (
                        <div
                            key={index}
                            className='flex items-center justify-center bg-cover bg-center bg-no-repeat h-[200px] md:h-[500px] relative text-white'
                            style={{ backgroundImage: `url(${slideImage.image})` }}
                        >
                        </div>
                    ))}
                </Fade>
            </div>
        </div>
    );
}

export default BackgroundImage;
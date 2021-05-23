import React from 'react';
import Image from 'next/image'

function isImageValid(src) {
    let promise = new Promise(resolve => {
        let img = document.createElement('img');
        img.onerror = () => resolve(false);
        img.onload = () => resolve(true);
        img.src = src;
    });

    return promise;
}

function Img({ src, fallbackSrc, ...rest }) {
    const imgEl = React.useRef(null);
    React.useEffect(() => {
        isImageValid(src).then(isValid => {
            if (!isValid) {
                imgEl.current.src = fallbackSrc;
            }
        });
    }, [src]);
    return (<div>
        <img {...rest} ref={imgEl} src={src} />
        <Image {...rest} src={src} />
    </div>);
}

const ItemImage = ({ brand, name }) => {
    return (
        //in case next/image: <Image ... /> with width and height
        <Img
            alt="some image"
            width={500}
            height={500}
            src={`/${name}.jpg`}
            fallbackSrc="/vercel.png"
        />
    );
};

export default ItemImage;

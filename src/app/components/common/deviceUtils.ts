import { useState, useEffect } from 'react';

const useDeviceSize = () => {
    const [size] = useState({
        width: 1240,
        height: 768,
    });

    useEffect(() => {
        const handleResize = () => {
            // setSize({
            //     width: window.innerWidth,
            //     height: window.innerHeight,
            // });
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return size;
};

export default useDeviceSize;

import React, { useEffect, useRef, useState } from 'react'
import type { ImgHTMLAttributes } from 'react';

type LazyProps = { 
    src:string
};

type ImageNativeTypes = ImgHTMLAttributes<HTMLImageElement>

type Props = LazyProps & ImageNativeTypes;

export const LazyImage = ({ src, ...imgProps}: Props): JSX.Element => {

    // reed read docs for useRef type -> null != undefined
    const node = useRef<HTMLImageElement>(null);

    const [source, setSource] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")


    // React.Children

    useEffect(() => {
      
        const observer = new IntersectionObserver((entries) => {
            entries.forEach( (entry) => {
                if (entry.isIntersecting) {
                    setSource(src)
                }
            })
        });

        if (node.current) {
            observer.observe(node.current);
        }
    

        return () => {
            observer.disconnect()
        }
    
    }, [src])
    

    return <img 
                ref={node}
                src={source}
                {...imgProps}
            />
  
}



// import type { FunctionComponent, FC } from 'react'


// export const RandomFox1 = () => {
  
//     return (<>
  
  
//     </>)
  
// }


// export const RandomFox3:FunctionComponent = () => {
  
//     return (<>
  
  
//     </>)
  
// }
  
// export const RandomFox4:FC = () => {
  
//     return (<>
  
  
//     </>)
  
//   }
  
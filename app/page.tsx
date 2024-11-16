"use client"

import { LazyImage } from "@/components/LazyImage";
import { useState } from "react";
import type { MouseEventHandler } from "react";

const randomNumber = () => Math.floor(Math.random() * 123) + 1;
const generateId= () => Math.random().toString(36).substring(2,9);

export default function Home() {

  // const [images, setImages] = useState<string[]>([
  // const [images, setImages] = useState<Array<string>>([
  const [images, setImages] = useState<ISomeImageItem[]>([
    // {id: generateId(), url:`https://randomfox.ca/images/${randomNumber()}.jpg`},
    // {id: generateId(), url:`https://randomfox.ca/images/${randomNumber()}.jpg`},
    // {id: generateId(), url:`https://randomfox.ca/images/${randomNumber()}.jpg`},
    // {id: generateId(), url:`https://randomfox.ca/images/${randomNumber()}.jpg`}
  ]);


  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    
    // const target = event.target

    const newImage:ISomeImageItem = {
      id: generateId(), 
      url:`https://randomfox.ca/images/${randomNumber()}.jpg`
    }

    setImages([
      ...images,
      newImage
    ]);
  }
  
  return (
    <>      
      <main>
        {/* <h1 className="text-3xl font-bold underline">Hola</h1> */}
        <button 
                onClick={addNewFox}
                className="sticky top-6 m-5 bg-blue pl-6 pr-6 pt-3 pb-3 ml-6 mt-6 mb-6 rounded-lg"
        >
                Add new Fox 🦊
        </button>
        <div className="grid justify-items-center">
            {
              images.map(({url, id}) => (
                <div key={id} className="p-4">
                  
                  <LazyImage
                    src={url}
                    width={320}
                    height="auto"
                    className='rounded bg-blue-300'
                  />

                </div>
              ))
            }
        </div>
      </main>
      <footer></footer>
    </>
  );
}

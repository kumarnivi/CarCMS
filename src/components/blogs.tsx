import React, { useEffect, useState } from "react";


const Blog = () => {
    const [num1, setNum1] = useState(100);


    useEffect(()=> {
        setNum1(200)
        console.log(setNum1)
    }, 
    [])

console.log(setNum1)

    return (
        <div>

            <h1>{num1}</h1>
            <button onClick={() => num1 + 1  }></button>
        </div>
    )
}

export default Blog;





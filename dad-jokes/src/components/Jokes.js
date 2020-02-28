import React, {useState, useEffect}  from 'react';
import axios from 'axios';

const Jokes = props => {

    const [jokes, setJokes] = useState([]);
 
    useEffect(() => {

        axios.get('http://localhost:3300/api/jokes')
            .then(axJokes => {
                setJokes(axJokes);
                console.log(axJokes)
            })
        
    })
    
    return(
        <div>
            <p>On the jokes page!</p>
        </div>
    )

}

export default Jokes;
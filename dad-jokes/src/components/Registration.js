import React, {useState}  from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';

const Registration = props => {

    const {register, handleSubmit, errors} = useForm();
    const history = useHistory();
    const onSubmit = data => {
        
        axios.post('http://localhost:3300/api/auth/register', data)
            .then(res => {
                console.log(res.data)
                history.push("/jokes")

            } )
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input 
                        name="username" 
                        ref={register({ required: true })} 
                        className="form-input"
                        placeholder="User Name"
                        />
                </div>
                {errors.username && <p>Enter your user name.</p>}
                
                <div>
                <input 
                    name="password"
                    type="password"
                    ref={register({ required: true })}
                    className="form-input"
                    placeholder="Password"
                />
                </div>
                {errors.password && <p>You need a password to register!</p>}

                <button type="submit" name="Register">Register</button>

            </form>
        </div>
    )

    
}

export default Registration;
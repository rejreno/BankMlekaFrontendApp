import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const LoginRegister = () => {

    const [action, setAction] = useState('');



    const loginLink = () => {
        setAction('');
    }
    
    return (
        <div className="panel-logowania">    
            <div  className={`wrapper${action}`}>
                <div className="form-box logowanie">
                    <form action="">
                        <h1>Logowanie</h1>


                        <div className="input-box">
                            <input type="text" 
                            placeholder='id_pacjenta' required/>
                            <FaUser className= 'icon' />
                        </div>


                        <div className="pamietaj-zapamietaj">
                            <label><input type="checkbox" />Zapamiętaj mnie</label>
                        </div>

                        <button type="Wyślij">Zaloguj się</button>

                    </form>
                </div>
            </div>
        </div>    
    );
};

export default LoginRegister
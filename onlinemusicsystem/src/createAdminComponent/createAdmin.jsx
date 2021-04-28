import React from 'react';
import './createAdmin.css';

const CreateAdmin = (props) => {
    return (
        <div class="bck">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h2>Create Admin</h2>
                    <form>
                        <input type="text" name="adminName" id="adminName" className="fadeIn second" placeholder="Name"/>
                        <input type="password" name="adminPassword" id="adminPassword" className="fadeIn third" placeholder="Password"/>
                        <input type="submit" className="fadeIn fourth" value="Create Admin"/>
                    </form>
                
                </div>
            </div>
        </div>
    );
};

export default CreateAdmin;
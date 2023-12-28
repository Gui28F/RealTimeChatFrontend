import React, {useEffect, useState} from 'react';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import {LOGIN_URL, postData, REGISTER_URL} from "../../Api";
import {useNavigate} from "react-router-dom";

function Login() {

    const [justifyActive, setJustifyActive] = useState('tab1');
    let navigate = useNavigate();
    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

    const handleRegister= ()=>{
        const userId = document.getElementById('form2_userid').value;
        const username = document.getElementById('form2_username').value;
        const password = document.getElementById('form2_password').value;

        const user = {
                userID: userId,
                username: username,
                password: password
            }
        postData(REGISTER_URL, user).then((response) => {
            if (!response.ok) {
                console.error(`Error posting data (${response.status})`)
                throw new Error(`Error posting data (${response.status})`)
            }
            console.log("User registered!")
        })
            .catch((error) => {
                console.error(error);
            });
    }
    const handleLogin = () =>{
        const userId = document.getElementById('form1_userid').value;
        const password = document.getElementById('form1_password').value;
        const userInfo = {
            userID: userId,
            password: password
        }
        postData(LOGIN_URL, userInfo).then((response) => {
            if (!response.ok) {
                console.error(`Error posting data (${response.status})`)
                throw new Error(`Error posting data (${response.status})`)
            }
            return response.json();
        }).then((res)=>{
            localStorage.setItem('token', res.token);
            navigate("/chats")
        })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent >

                <MDBTabsPane open={justifyActive === 'tab1'}>

                    <div className="text-center mb-3">
                        <p>Sign in with:</p>

                        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='facebook-f' size="sm"/>
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='twitter' size="sm"/>
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='google' size="sm"/>
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='github' size="sm"/>
                            </MDBBtn>
                        </div>

                        <p className="text-center mt-3">or:</p>
                    </div>

                    <MDBInput wrapperClass='mb-4' label='User ID' id='form1_userid' type='email'/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='form1_password' type='password'/>

                    <div className="d-flex justify-content-between mx-4 mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                        <a href="!#">Forgot password?</a>
                    </div>

                    <MDBBtn className="mb-4 w-100" onClick={()=>handleLogin()}>Sign in</MDBBtn>
                    <p className="text-center">Not a member? <a  onClick={()=>handleJustifyClick('tab2')}href="#!">Register</a></p>

                </MDBTabsPane>

                <MDBTabsPane open={justifyActive === 'tab2'}>

                    <div className="text-center mb-3">
                        <p>Sign un with:</p>

                        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='facebook-f' size="sm"/>
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='twitter' size="sm"/>
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='google' size="sm"/>
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='github' size="sm"/>
                            </MDBBtn>
                        </div>

                        <p className="text-center mt-3">or:</p>
                    </div>

                    <MDBInput wrapperClass='mb-4' label='User ID' id='form2_userid' type='text'/>
                    <MDBInput wrapperClass='mb-4' label='Username' id='form2_username' type='text'/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='form2_password' type='password'/>
                    <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form2_confirm_pass' type='password'/>

                    <div className='d-flex justify-content-center mb-4'>
                        <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
                    </div>

                    <MDBBtn className="mb-4 w-100" onClick={()=>handleRegister()}>Sign up</MDBBtn>

                </MDBTabsPane>

            </MDBTabsContent>

        </MDBContainer>
    );
}

export default Login;
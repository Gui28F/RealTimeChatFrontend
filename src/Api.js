// api.js
const BACKEND_URL = "http://localhost:8080";
const REGISTER_URL = BACKEND_URL+"/users/register";
const LOGIN_URL = BACKEND_URL+"/users/login";
const CHATS_URL = BACKEND_URL+"/user/chats";
// Function to make a GET request
async function getData(url) {
    const token = localStorage.getItem('token');
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
            },
            mode: 'cors',
        })
            .then(res => res.json())
        return response;
    }
    catch(error){
        console.error('Error:', error);
    }
}

// Function to make a POST request
async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

// You can add more functions for other HTTP methods if needed

// Export the functions to use them in other files
export { getData, postData, BACKEND_URL, REGISTER_URL, LOGIN_URL, CHATS_URL };

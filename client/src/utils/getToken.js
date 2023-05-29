const token = localStorage.getItem('token');
const config = {
    headers: {
        Authorization: token
    }
}

export { token, config };
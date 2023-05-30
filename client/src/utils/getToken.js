const getToken = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: token
        }
    };
};

export default getToken;
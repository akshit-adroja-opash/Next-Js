const SingleProfile = async (props) => {
    const params = await props.params;
    const username = params.username;
    console.log(username);
    return <h1>user = {username}</h1>
};

export default SingleProfile;
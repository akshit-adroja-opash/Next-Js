"use client";
import { use } from "react";

const SingleProfilepost = (props) => {
    const user = use(props.params);
    console.log(user);
    return <h1>user = {user.username}, postId : {user.postId}   </h1>


};

export default SingleProfilepost;
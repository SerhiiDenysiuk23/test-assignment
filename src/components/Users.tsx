import React, {useEffect, useState} from 'react';
import UserCard from "../elements/UserCard";
import {getQuery} from "../api/core";
import {User} from "../types/user";

const Users = () => {
    const [userSate, setUserState] = useState<User[]>([])
    const [page, setPage] = useState<number>(1)
    useEffect(()=>{
        const response =  getQuery("users", page, 6)
        response.then((resp)=>{
            setUserState([...userSate, ...resp.users])
        })
    },[page])

    const buttonHandleClick = () => {
        setPage(page+1)
    }

    return (
        <section className={"users container"}>
            <h1>Working with GET request</h1>
            <div className={"user-grid"}>
                {
                    userSate.map((value)=>
                        <UserCard user={value} key={value.id}/>
                    )
                }
            </div>
            <div onClick={buttonHandleClick} className={"button"}>Show more</div>
        </section>
    );
};

export default Users;
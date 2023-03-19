import React, {FC, useEffect, useState} from 'react';
import UserCard from "../elements/UserCard";
import {getQuery} from "../api/core";
import {User} from "../types/user";

const Users: FC<{ pick: boolean }> = ({pick}) => {
    const [userState, setUserState] = useState<User[]>([])
    const [page, setPage] = useState<number>(1)

    const count = 6

    const [showButton, setShowButton] = useState<boolean>(true)

    const [firstRender, setFirstRender] = useState<boolean>(false)

    useEffect(() => {
        const response = getQuery("users", page, count)
        response.then((resp) => {
            setShowButton(resp.users.length == count)
            setUserState([...userState, ...resp.users])
        })
    }, [page])

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false)
            return
        }

        setPage(1)
        const response = getQuery("users", 1, count)
        response.then((resp) => {

            setUserState([...resp.users])
        })
    }, [pick])

    const buttonHandleClick = () => {
        setPage(page + 1)
    }

    return (
        <section className={"users container"}>
            <h1 id={"users"}>Working with GET request</h1>
            <div className={"user-grid"}>
                {
                    userState.map((value) =>
                        <UserCard user={value} key={value.id}/>
                    )
                }
            </div>
            {showButton && <div onClick={buttonHandleClick} className={"button"}>Show more</div>}
        </section>
    );
};

export default Users;
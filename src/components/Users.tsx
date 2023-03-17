import React from 'react';
import UserCard from "../elements/UserCard";

const Users = () => {
    const arr = [1,2,3,4,5,6,7,8,9]
    return (
        <section className={"users container"}>
            <h1>Working with GET request</h1>
            {/*<UserCard/>*/}
            <div className={"user-grid"}>
                {
                    arr.map((value, index)=>
                        <UserCard key={value}/>
                    )
                }
            </div>
            <div className={"button"}>Show more</div>
        </section>
    );
};

export default Users;
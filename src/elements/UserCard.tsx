import React, {FC} from 'react';
import {User} from "../types/user";

const UserCard: FC<{user: User}> = ({user}) => {
    return (
        <div className={"card"}>
            <div className={"card_photo"}><img src={user.photo} alt="avatar"/></div>
            <div className={"card_name"}>{user.name}</div>
            <div className={"card_content"}>{user.position}</div>
            <div className={"card_content"}>{user.email}</div>
            <div className={"card_content"}>{user.phone}</div>
        </div>
    );
};

export default UserCard;
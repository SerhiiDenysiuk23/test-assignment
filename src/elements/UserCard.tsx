import React, {FC} from 'react';
import {User} from "../types/user";

const UserCard: FC<{user: User}> = ({user}) => {
    return (
        <div className={"card"}>
            <div className={"card_photo"}><img src={user.photo} alt="avatar"/></div>
            <div title={user.name} className={"card_name"}>{user.name}</div>
            <div title={user.position} className={"card_content"}>{user.position}</div>
            <div title={user.email} className={"card_content"}><a href={`mailto:${user.email}`}>{user.email}</a></div>
            <div title={user.phone} className={"card_content"}><a href={`tel:${user.phone}`}>{user.phone}</a></div>
        </div>
    );
};

export default UserCard;
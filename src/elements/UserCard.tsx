import React from 'react';

const UserCard = () => {
    const name = "Salvador Stewart Flynn Thomas Salva Salve"
    return (
        <div className={"card"}>
            <div className={"card_photo"}></div>
            <div className={"card_name"}>{name}</div>
            <div className={"card_content"}>{name}</div>
            <div className={"card_content"}>{name}</div>
            <div className={"card_content"}>{name}</div>
        </div>
    );
};

export default UserCard;
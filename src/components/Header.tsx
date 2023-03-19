import React from 'react';

const Header = () => {
    return (
        <header>
            <section className={"navbar container"}>
                <div id={"logo"}><a href="#"><img src="/logo.png" alt="logo"/></a></div>
                <nav>
                    <ul>
                        <a href="#users">
                            <li className={"button"}>Users</li>
                        </a>
                        <a href="#signup">
                            <li className={"button"}>Sign up</li>
                        </a>
                    </ul>
                </nav>
            </section>
        </header>
    );
};

export default Header;
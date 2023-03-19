import React from 'react';

const Banner = () => {
    return (
        <section style={{backgroundImage: "url(./banner.png)"}} className={"banner"}>
            <div className="banner_content">
                <h1>Test assignment for front-end developer</h1>
                <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a
                    vast
                    understanding of User design thinking as they'll be building web interfaces with accessibility in
                    mind.
                    They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                <a href="#signup">
                    <div className={"button"}>Sign up</div>
                </a>
            </div>
        </section>
    );
};

export default Banner;
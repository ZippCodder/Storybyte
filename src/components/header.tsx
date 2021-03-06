import textLogo from "../../public/images/text_logo2.png";
import flagLogo from "../../public/images/flag_logo.png";
import React from "react";
// @ts-ignore
import Menu from "./menu.tsx";

const menu = (
<nav>
<ul>
<li title="sign up" className="menu__dropdown__li"><a href="/signup" tabIndex={0}>Sign Up | <i className="fas fa-user-plus"></i></a></li>
<li title="sign in" className="menu__dropdown__li"><a href="/signin" tabIndex={0}>Sign In | <i className="fas fa-sign-out-alt"></i></a></li>
</ul>
</nav>
);

export default function Header({loggedIn}: {loggedIn: boolean}): JSX.Element {
return (<header className="main-header">
        <a className="main-logo" href="" title="logo" aria-label="logo" role="img">
        <img alt="logo" className="flag-logo" src={flagLogo}/>
        <img alt="logo" className="text-logo" src={textLogo}/>
        </a>
        <h2 className="main-slogan" title="slogan">Stories Worth Sharing</h2>
        <Menu>
        { menu }
        </Menu>
        </header>
);
}



import textLogo from "../../public/images/text_logo2.png";
import flagLogo from "../../public/images/flag_logo.png";
import React from "react";
// @ts-ignore
import Menu from "./menu.tsx";

const menu = (
<nav>
<ul>
<li className="menu__dropdown__li"><a href="" tabIndex={0}>Sign Up | <i className="fas fa-user-plus"></i></a></li>
<li className="menu__dropdown__li"><a href="" tabIndex={0}>Sign In | <i className="fas fa-sign-out-alt"></i></a></li>
</ul>
</nav>
);

export default function Header({loggedIn}: {loggedIn: boolean}) {
return (<header className="main-header">
        <a className="main-logo" href="" title="logo">
        <img className="flag-logo" src={flagLogo}/>
        <img className="text-logo" src={textLogo}/>
        </a>
        <h2 className="main-slogan" title="slogan">Stories Worth Sharing</h2>
        <Menu>
        { menu }
        </Menu>
        </header>
);
}



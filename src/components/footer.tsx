import React from "react";

const socials = (
<div className="social-links">
<i className="fab fa-dev"></i>
<i className="fab fa-github"></i>
<i className="fab fa-discord"></i>
</div>
);

export default function Footer(): JSX.Element {
return (
<footer>
{socials}
<p>Storybyte &#169; Copyright 2022</p>
</footer>
);
}

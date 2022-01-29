import React from "react";
const { useState } = React;

interface MenuProps {
children: React.ReactNode;
}

export default function Menu({children}: MenuProps): JSX.Element {

const [open, setOpen] = useState<boolean>(false); 

function toggleMenu() {
if (open) {
setOpen(false);
} else {
setOpen(true);
}
}

return (
<div className="main-menu" title="main menu">
<i tabIndex={0} className="fas fa-bars" onClick={toggleMenu}></i>
<div className="main-menu__dropdown" style={{display: (open) ? "block":"none"}}>{children}</div>
</div>
);
}

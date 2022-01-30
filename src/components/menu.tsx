import React, {KeyboardEvent, KeyboardEventHandler} from "react";
const { useState } = React;

interface MenuProps {
children: React.ReactNode;
}

export default function Menu({children}: MenuProps): JSX.Element {

const [open, setOpen] = useState<boolean>(false); 

function toggleMenu(): void {
if (open) {
setOpen(false);
} else {
setOpen(true);
}
}

function keyToggle(e: KeyboardEvent<HTMLElement>): void {
if (e.key === "Enter") {
toggleMenu();
}
}

return (
<div className="main-menu" title="main menu">
<i tabIndex={0} aria-haspopup="menu" aria-label="menu" aria-controls="main-dropdown" className="fas fa-bars" onClick={toggleMenu} onKeyDown={keyToggle}></i>
<div role="menu" aria-label="menu dropdown content" className="main-menu__dropdown" id="main-dropdown" style={{display: (open) ? "block":"none"}}>{children}</div>
</div>
);
}

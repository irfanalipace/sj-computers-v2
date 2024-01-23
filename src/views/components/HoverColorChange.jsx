import React from "react";

function HoverColorChange({
    children,
    hoverColor = "#ffa41c",
    defaultColor = "black",
}) {
    function changeBackground(e) {
        e.target.style.cursor = "pointer";
        e.target.style.color = hoverColor;
    }
    function changeBackgroundLeave(e) {
        e.target.style.color = defaultColor;
    }

    return (
        <div
            borderBottom={false}
            onMouseLeave={changeBackgroundLeave}
            onMouseOver={changeBackground}
        >
            {children}
        </div>
    );
}

export default HoverColorChange;

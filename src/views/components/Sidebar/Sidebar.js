import { lazy, Suspense } from "react";
const SidebarMenu = lazy(() => import("./SidebarMenu"));
import "./Sidebar.css";

export default function Sidebar({ openState, toggleSidebar }) {
    return (
        <div>
            {openState && (
                <div
                    className="sidebarOverlay"
                    onClick={() => toggleSidebar()}
                ></div>
            )}
            <div
                className="sideMenu-container"
                style={{ left: openState ? "0" : "-350px" }}
            >
                {openState && (
                    <Suspense>
                        <SidebarMenu
                            openState={openState}
                            toggleSidebar={toggleSidebar}
                        />
                    </Suspense>
                )}
            </div>
        </div>
    );
}

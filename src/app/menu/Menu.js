// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import styles from "../page.module.css";
// import { menuData } from "@/menuData";

// export default function Menu() {
//     const [activeParent, setActiveParent] = useState(null);
//     const [activeChild, setActiveChild] = useState(null);

//     const handleParentClick = (parentId) => {
//         setActiveParent(parentId);
//         setActiveChild(null); // Reset active child when parent changes
//     };

//     const handleChildClick = (childId) => {
//         setActiveChild(childId);
//     };

//     return (
//         <div className={styles.sidebar}>
//             <nav>
//                 <ul>
//                     {menuData.map((parent) => (
//                         <li key={parent.id} className={styles.menuItem}>
//                             <button
//                                 className={`${styles.button} ${activeParent === parent.id ? styles.active : ""
//                                     }`}
//                                 onClick={() => handleParentClick(parent.id)}
//                             >
//                                 <Link href={parent.path}>{parent.label}</Link>
//                             </button>

//                             {/* Children */}
//                             {parent.children.length > 0 && (
//                                 <ul className={styles.submenu}>
//                                     {parent.children.map((child) => (
//                                         <li key={child.id} className={styles.submenuItem}>
//                                             <button
//                                                 className={`${styles.button} ${activeChild === child.id ? styles.activeChild : ""
//                                                     }`}
//                                                 onClick={() => handleChildClick(child.id)}
//                                             >
//                                                 <Link href={child.path}>{child.label}</Link>
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </div>
//     );
// }


"use client";

// import { useState } from "react";
// import Link from "next/link";
// import styles from "../page.module.css";
// import { menuData } from "@/menuData";

// export default function Menu() {
//     const [activeParent, setActiveParent] = useState(null);
//     const [activeChild, setActiveChild] = useState(null);

//     const handleParentClick = (parentId) => {
//         setActiveParent(parentId);
//         setActiveChild(null); // Reset active child when parent changes
//     };

//     const handleChildClick = (childId) => {
//         setActiveChild(childId);
//     };

//     return (
//         <div className={styles.sidebar}>
//             <nav>
//                 <ul>
//                     {menuData.map((parent) => (
//                         <li key={parent.id} className={styles.menuItem}>
//                             <Link
//                                 href={parent.path}
//                                 className={`${styles.button} ${activeParent === parent.id ? styles.active : ""}`}
//                                 onClick={() => handleParentClick(parent.id)}
//                             >
//                                 {parent.label}
//                             </Link>

//                             {/* Children */}
//                             {parent.children.length > 0 && (
//                                 <ul className={styles.submenu}>
//                                     {parent.children.map((child) => (
//                                         <li key={child.id} className={styles.submenuItem}>
//                                             <Link
//                                                 href={child.path}
//                                                 className={`${styles.button} ${activeChild === child.id ? styles.activeChild : ""}`}
//                                                 onClick={() => handleChildClick(child.id)}
//                                             >
//                                                 {child.label}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </div>
//     );
// }


// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation"; // Updated to avoid SSR conflicts
// import styles from "../page.module.css";
// import { menuData } from "@/menuData";

// export default function Menu() {
//     const [activeParent, setActiveParent] = useState(null);
//     const [activeChild, setActiveChild] = useState(null);

//     // Safely get the pathname
//     const router = useRouter();
//     const [currentPath, setCurrentPath] = useState("");

//     useEffect(() => {
//         // Avoid accessing router directly in case it's not ready
//         if (typeof window !== "undefined") {
//             setCurrentPath(window.location.pathname);
//         }
//     }, []);

//     useEffect(() => {
//         // Find active parent and child based on the current path
//         const activeItem = menuData.find((parent) => {
//             if (parent.path === currentPath) {
//                 return true;
//             }
//             return parent.children.some((child) => child.path === currentPath);
//         });
//         console.log(activeItem, "activeItem");

//         if (activeItem) {
            
//             setActiveParent(activeItem.id);
//             const activeChildItem = activeItem.children.find((child) => child.path === currentPath);
//             setActiveChild(activeChildItem ? activeChildItem.id : null);
//         }
//     }, [currentPath]);

//     return (
//         <div className={styles.sidebar}>
//             <nav>
//                 <ul>
//                     {menuData.map((parent) => (
//                         <li key={parent.id} className={styles.menuItem}>
//                             <Link
//                                 href={parent.path}
//                                 className={`${styles.button} ${activeParent === parent.id ? styles.active : ""}`}
//                             >
//                                 {parent.label}
//                             </Link>

//                             {/* Children */}
//                             {parent.children.length > 0 && (
//                                 <ul className={styles.submenu}>
//                                     {parent.children.map((child) => (
//                                         <li key={child.id} className={styles.submenuItem}>
//                                             <Link
//                                                 href={child.path}
//                                                 className={`${styles.button} ${activeChild === child.id ? styles.activeChild : ""}`}
//                                             >
//                                                 {child.label}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </div>
//     );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { menuData } from "@/menuData";

export default function Menu() {
    const [activeParent, setActiveParent] = useState(null);
    const [activeChild, setActiveChild] = useState(null);
    const router = useRouter();

    const handleParentClick = (parentId) => {
        setActiveParent(parentId);
        setActiveChild(null); // Reset child when switching parent
    };

    const handleChildClick = (parentId, childId) => {
        setActiveParent(parentId);
        setActiveChild(childId);
    };

    return (
        <div className={styles.sidebar}>
            <nav>
                <ul>
                    {menuData.map((parent) => (
                        <li key={parent.id} className={styles.menuItem}>
                            <Link
                                href={parent.path}
                                className={`${styles.button} ${activeParent === parent.id ? styles.active : ""}`}
                                onClick={() => handleParentClick(parent.id)}
                            >
                                {parent.label}
                            </Link>

                            {/* Children */}
                            {parent.children.length > 0 && (
                                <ul className={styles.submenu}>
                                    {parent.children.map((child) => (
                                        <li key={child.id} className={styles.submenuItem}>
                                            <Link
                                                href={child.path}
                                                className={`${styles.button} ${activeChild === child.id ? styles.activeChild : ""}`}
                                                onClick={() => handleChildClick(parent.id, child.id)}
                                            >
                                                {child.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

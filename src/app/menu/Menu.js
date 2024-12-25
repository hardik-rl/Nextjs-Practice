"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "../page.module.css";
import { menuData } from "@/menuData";

export default function Menu() {
    const [activeParent, setActiveParent] = useState(null);
    const [activeChild, setActiveChild] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

     useEffect(() => {
        const activeItem = menuData.find((parent) => {
            if (parent.path === pathname) {
                return true;
            }
            return parent.children.some((child) => child.path === pathname);
        });

        if (activeItem) {
            setActiveParent(activeItem.id);
            const activeChildItem = activeItem.children.find((child) => child.path === pathname);
            setActiveChild(activeChildItem ? activeChildItem.id : null);
        } else {
            setActiveParent(null);
            setActiveChild(null);
        }
    }, [pathname]);

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

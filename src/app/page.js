// "use client"
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import styles from "./page.module.css";
// import Link from "next/link";

// export default function Home() {
//   const router = useRouter();

//   // Function to check if a route is active
//   const isActive = (path) => router.pathname === path;
//   return (
//     <div className={styles.page}>
//       <nav className={styles.menu}>
//         <ul>
//           {/* Parent Menu Item */}
//           <li className={`${isActive("/") ? styles.active : ""}`}>
//             <Link href="/">Home</Link>
//           </li>

//           {/* Parent Menu with Submenu */}
//           <li
//             className={`${router.pathname?.startsWith("/about") ? styles.active : ""
//               } ${styles.hasSubmenu}`}
//           >
//             <Link href="/about">About</Link>
//             <ul className={styles.submenu}>
//               <li className={`${isActive("/about/team") ? styles.active : ""}`}>
//                 <Link href="/about/team">Team</Link>
//               </li>
//               <li
//                 className={`${isActive("/about/company") ? styles.active : ""}`}
//               >
//                 <Link href="/about/company">Company</Link>
//               </li>
//             </ul>
//           </li>

//           {/* Another Parent Menu Item */}
//           <li className={`${isActive("/contact") ? styles.active : ""}`}>
//             <Link href="/contact">Contact</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }
// "use client";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <p>This is the main content area. The sidebar is on the left.</p>
    </div>
  );
}

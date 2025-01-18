
export const menuData = [
  {
      id: 1,
      label: "Home",
      path: "/",
      children: [],
  },
  {
      id: 2,
      label: "About",
      path: "/about",
      children: [
          { id: 21, label: "Team", path: "/about/team" },
          { id: 22, label: "Company", path: "/about/company" },
      ],
  },
  {
      id: 3,
      label: "Product",
      path: "/product",
      children: [],
  },
];

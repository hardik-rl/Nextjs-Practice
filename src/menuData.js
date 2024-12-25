export const menuData = [
    {
      id: "home",
      label: "Home",
      path: "/",
      children: [],
    },
    {
      id: "about",
      label: "About",
      path: "/about",
      children: [
        { id: "team", label: "Team", path: "/about/team" },
        { id: "company", label: "Company", path: "/about/company" },
      ],
    },
    {
      id: "contact",
      label: "Contact",
      path: "/contact",
      children: [],
    },
  ];
  
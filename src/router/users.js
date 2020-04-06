import Users from "../model/Usera//Users";
import UsersList from "../model/Usera/UsersList";
import UserDetail from "../model/Usera/UserDetail";

const userseRouter = {
  path: "/users",
  name: "Users",
  component: Users,
  redirect: { name: "UsersList" },
  children: [
    {
      path: "list",
      name: "UsersList",
      component: UsersList,
      props: true,
    },
    {
      path: "detail",
      name: "UserDetail",
      component: UserDetail,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
  ],
};

export default userseRouter;

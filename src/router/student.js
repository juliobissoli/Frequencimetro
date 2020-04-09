import Students from "../model/Student/Student";
import StudentsList from "../model/Student/StudentList";
import StudentsDetail from "../model/Student/StudentDetail";

const studentRouter = {
  path: "/students",
  name: "Students",
  component: Students,
  redirect: { name: "StudentsList" },
  children: [
    {
      path: "list",
      name: "StudentsList",
      component: StudentsList,
      props: true,
    },
    {
      path: "detail",
      name: "StudentDetail",
      component: StudentsDetail,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
  ],
};

export default studentRouter;

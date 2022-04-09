import LoginPage from "pages/LoginPage/LoginPage";
import MainPage from "../../pages/HeartPage/HeartPage";
import ContactsPage from "../../pages/ContactsPage/ContactsPage";

export const routes = [
  {
    path: "/",
    component: <ContactsPage />,
    element: <ContactsPage />,
    name: "ContactPage",
    private: true,
  },
  {
    path: "/login",
    component: <LoginPage />,
    element: <LoginPage />,
    name: "login",
    private: false,
  },
  {
    path: "/heart/:id",
    component: <MainPage />,
    element: <MainPage />,
    name: "HeartPage",
    private: true,
  },
];

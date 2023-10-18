import "./App.css";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "./components/Error/ErrorElement";
import HomeView from "./components/HomeView/HomeView.tsx";
import DetailView from "./components/DetailView/DetailView.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeView/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/:movieId",
        element: <DetailView/>,
    }
]);

export default router;

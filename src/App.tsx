import "./App.css";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "./components/Error/ErrorElement";
import HomeView from "./components/HomeView/HomeView.tsx";
import DetailView from "./components/DetailView/DetailView.tsx";
// import the library
import {library} from '@fortawesome/fontawesome-svg-core'

// import your icons
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'

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
library.add(fas, far)

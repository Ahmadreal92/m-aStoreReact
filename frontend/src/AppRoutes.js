import React from "react";
import { Route , Routes} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ParfumPage from "./pages/Parfum/ParfumPage";

export default function AppRoutes(){
    return <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path="/search/:searchTerm" element= {<HomePage/>} />
        <Route path="/tag/:tag" element= {<HomePage/>} />
        <Route path="/parfum/:id" element= {<ParfumPage/>} />
    </Routes>
}


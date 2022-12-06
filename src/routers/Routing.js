import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

import { map } from "lodash"
import configRouters from './configRouters';


export default function Routing({setRefresCheckLogin}) {

  return (
        <Router>
            <Routes>
                 {
                     map(configRouters, (route,index) =>(
                        <Route key={index} path={route.path} element={<route.page setRefresCheckLogin />} exact={route.exact}/ >
                    ))
                 }
            </Routes>
        </Router>
  );
}

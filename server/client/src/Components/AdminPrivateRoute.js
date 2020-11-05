// import React from 'react';
// import { Redirect, Route } from "react-router-dom";

// export const AdminPrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       (localStorage.getItem("token") !==null) ? (
//         <Component {...props} />
//       ) : (
//           <Redirect to={{ 
//             pathname: "/login",
//             state: {match: props.location}
//            }} />
//         )
//     }
//   />
// )
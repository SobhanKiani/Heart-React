import { SocketInitializer, Toast } from "components";
import { Route, Routes } from "react-router-dom";

import { routes } from "./misc/routes/routes";
import PrivateRoute from "misc/routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <SocketInitializer>
        <Routes>
          {routes.map((route, key) =>
            route.private ? (
              <Route element={<PrivateRoute />}>
                <Route {...route} key={key} />
              </Route>
            ) : (
              <Route key={key} {...route} />
            )
          )}
        </Routes>
      </SocketInitializer>
      <Toast />
    </div>
  );
}

export default App;

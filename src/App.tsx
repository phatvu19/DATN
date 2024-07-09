import { useEffect, useState } from "react"
import { RootAuthRouter, RootUnAuthRouter } from "./routes"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
function App() {
    const [user, setuser] = useState<any>()
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null")
        setuser(storedUser)
    }, [])
    const isAdmin = user && user?.data?.role_id == 0
    return (
        <Router>
            <Routes>
                {isAdmin == true
                    ? RootAuthRouter.map((route, index) => (
                          <Route
                              key={index}
                              path={route.path}
                              element={route.element}
                          >
                              {route.children.map((childRoute, childIndex) => (
                                  <Route
                                      key={childIndex}
                                      path={childRoute.path}
                                      element={childRoute.element}
                                  />
                              ))}
                            {route.path === '/admin' && (
                                <Route
                                    path="/admin"
                                    element={<Navigate to="/admin/thong-ke" />}
                                />
                            )}
                          </Route>
                      ))
                    : ""}
                
                <Route path={"/"} element={RootUnAuthRouter[0]?.element}>
                    {RootUnAuthRouter[0]?.children?.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Route>
                {isAdmin == false ? (
                    <Route path="*" element={<Navigate to="/" />} />
                ) : (
                    ""
                )}
                
            </Routes>
        </Router>
    )
}

export default App

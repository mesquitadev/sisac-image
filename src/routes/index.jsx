import React from "react"
import { Switch, Route } from "react-router-dom"
import { MainLayout } from "../Layouts"
import { Dashboard, SignIn, Atendimentos, Atendimento, Laudo } from "../pages"

const Routes = ({ pageProps }) => (
  <Switch>
    <Route path="/login" component={SignIn} />
    <MainLayout>
      <Route path="/" exact component={Dashboard} />
      <Route path="/atendimentos" component={Atendimentos} />
      <Route path="/atendimento/:id" component={Atendimento} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/laudo" exact component={Laudo} />
    </MainLayout>
  </Switch>
)
export default Routes

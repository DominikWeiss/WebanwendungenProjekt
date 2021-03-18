import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import Index from './modules/index.jsx';
import New from './modules/new.jsx';
import View from './modules/view.jsx';
import Edit from './modules/edit.jsx';

export default function Module() {
    return (
        <Switch>
          <Route path="/modules" exact component={Index}/>
          <Route path="/modules/new" component={New}/>
          <Route path="/modules/:mid" exact component={View}/>
          <Route path="/modules/:mid/edit" component={Edit}/>
        </Switch>
    );
};
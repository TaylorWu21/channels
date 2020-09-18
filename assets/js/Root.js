import React, { memo } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

import PartOne from "./PartOne";
import PartTwo from "./PartTwo";

const Root = () => (
  <>
    <BrowserRouter>
      <NavLink to="/part_one" activeStyle={{ color: "black" }}>
        Part One
      </NavLink>
      <NavLink to="/part_two" activeStyle={{ color: "black" }}>
        Part Two
      </NavLink>
      <Switch>
        <Route path="/part_one" component={PartOne} />
        <Route path="/part_two" component={PartTwo} />
      </Switch>
    </BrowserRouter>
  </>
);

export default memo(Root);

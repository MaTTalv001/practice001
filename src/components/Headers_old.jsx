import React from "react";
import { Link } from "react-router-dom";
import { RoutePath } from "../common/Route";

const Headers = () => {
  return (
    <header className="pr-4">
      <nav>
        <ul className="flex gap-2.5 m-2.5">
          <li>
            <Link to={RoutePath.sample1.path}>{RoutePath.sample1.name}</Link>
          </li>
          <li>
            <Link to={RoutePath.sample2.path}>{RoutePath.sample2.name}</Link>
          </li>
          <li>
            <Link to={RoutePath.sample3.path}>{RoutePath.sample3.name}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Headers;

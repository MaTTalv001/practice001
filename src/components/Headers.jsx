import React from "react";
import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <header>
      <nav>
        <ul style={{ display: "flex", gap: 10, margin: 10 }}>
          <li>
            <Link to="/sample1">ボール出現サンプル</Link>
          </li>
          <li>
            <Link to="/sample2">移動・回転サンプル</Link>
          </li>
          <li>
            <Link to="/sample3">自動回転サンプル</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Headers;

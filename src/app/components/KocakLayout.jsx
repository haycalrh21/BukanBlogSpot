"use client";
import { useState } from "react";

export default function KocakLayout({ sortirData }) {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      {sortirData.map((item) => (
        <div key={item.id}>
          <h1>{item.id}</h1>
        </div>
      ))}
    </div>
  );
}

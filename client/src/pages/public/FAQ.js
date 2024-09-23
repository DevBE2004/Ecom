import clsx from "clsx";
import React, { useState } from "react";
import { FAQS } from "utils/contants";

const FAQ = () => {
  const [activate, setActivate] = useState({});

  const toggleActivate = (id) => {
    setActivate((prevActivate) => ({
      ...prevActivate,
      [id]: !prevActivate[id],
    }));
  };

  return (
    <div className="p-6">
      <h3 className="text-3xl font-bold mb-6 text-center">FAQs</h3>

      {FAQS.map((el) => (
        <div
          key={el.id}
          onClick={() => toggleActivate(el.id)}
          className="border rounded-lg shadow-sm mb-4 transition-all duration-300 hover:shadow-lg cursor-pointer"
        >
          <div
            className={clsx(
              "flex items-center justify-between p-4",
              activate[el.id] ? "bg-main text-white" : "bg-white text-gray-800"
            )}
          >
            <span className="font-semibold">{el.Q}</span>
            <span className="text-lg">{activate[el.id] ? "-" : "+"}</span>
          </div>
          {activate[el.id] && (
            <div className="p-4 border-t border-gray-200 text-gray-600">
              {el.A}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
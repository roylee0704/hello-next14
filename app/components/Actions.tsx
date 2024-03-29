"use client";

import React, { useRef, useState } from "react";

type ActionStatusType = "pending" | "running" | "completed" | "failed";
export type Action = {
  name: string;
  status: ActionStatusType;
  elapsedTime?: number;
  btnRef: React.RefObject<HTMLButtonElement>;
};

const Actions = () => {
  const [actions, setActions] = useState<Action[]>([
    {
      name: "A",
      status: "pending",
      btnRef: useRef(null),
    },
    {
      name: "B",
      status: "pending",

      btnRef: useRef(null),
    },
    {
      name: "C",
      status: "pending",
      btnRef: useRef(null),
    },
  ]);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleClickN = async (index: number) => {
    console.log("index::", index);

    const timeStart = Date.now();
    const timer = setInterval(() => {
      setActions((prev) => {
        const newActions = [...prev];
        newActions[index].elapsedTime = Math.floor(
          (Date.now() - timeStart) / 1000
        );
        newActions[index].status = "running";
        return newActions;
      });
    }, 1000);

    await wait(3000);

    clearInterval(timer);

    setActions((prev) => {
      const newActions = [...prev];
      newActions[index].status = "completed";
      return newActions;
    });

    if (index === actions.length - 1) return console.log("end");

    const nextAction = actions[index + 1];
    nextAction.btnRef.current!.click();
  };

  return (
    <div className="flex flex-col">
      <hr />

      <button className="btn" onClick={() => handleClickN(0)}>
        Run All
      </button>

      {actions.map((action, index) => {
        return (
          <>
            <div className="flex">
              <div className="flex-1">{action.name}</div>
              <div className="flex-1">{action.status}</div>
              <div className="flex-1">{action.elapsedTime}s</div>
              <div className="flex-1">
                <button
                  ref={action.btnRef}
                  className="btn hidden"
                  onClick={() => handleClickN(index)}
                >
                  Run
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Actions;

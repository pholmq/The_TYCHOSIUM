import { useEffect, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useStore } from "./store";
import {
  posToDate,
  posToTime,
  posToJulianDay,
  isValidDate,
  dateTimeToPos,
  isValidTime,
  isNumeric,
  julianDayTimeToPos,
  speedFactOptions
} from "./TimeDateFunctions";

export const Controls = () => {
  const toggleRun = useStore((state) => state.toggleRun);
  const toggleOrbits = useStore((state) => state.toggleOrbits);
  const toggleArrows = useStore((state) => state.toggleArrows);
  const posRef = useStore((state) => state.posRef);
  const speedFact = useStore((state) => state.speedFact);
  const setSpeedFact = useStore((state) => state.setSpeedFact);
  const setPlotPos = useStore((state) => state.setPlotPos);

  useControls(() => ({
    plotPos: {
      value: useStore.getState().plotPos,
      onChange: (v) => setPlotPos(v)
    },
    orbits: {
      value: useStore.getState().orbits,
      onChange: (v) => toggleOrbits(v)
    },
    arrows: {
      value: useStore.getState().arrows,
      onChange: (v) => toggleArrows(v)
    }
  }));

  const runRef = useRef(useStore.getState().run);
  const dateRef = useRef();
  const timeRef = useRef();
  const julianDayRef = useRef();
  useEffect(() => {
    useStore.subscribe((state) => (runRef.current = state.run));
    updateControls();

    const intervalId = setInterval(() => {
      if (runRef.current) {
        updateControls();
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  function updateControls() {
    posDisplayRef.current.value = 0 + posRef.current;

    dateRef.current.value = posToDate(posRef.current);
    timeRef.current.value = posToTime(posRef.current);
    julianDayRef.current.value = posToJulianDay(posRef.current);

    // dtpRef.current.value = dateTimeToPos(
    //   dateRef.current.value,
    //   timeRef.current.value
    // );
    // tpRef.current.value = timeToPos(timeRef.current.value);
  }

  function dateKeyDown(e) {
    if (e.key !== "Enter") {
      return;
    }
    if (!isValidDate(dateRef.current.value)) {
      dateRef.current.value = posToDate(posRef.current);
      return;
    }
    posRef.current = dateTimeToPos(
      dateRef.current.value,
      posToTime(posRef.current)
    );
    updateControls();
  }
  function dateOnBlur(e) {
    if (!isValidDate(dateRef.current.value)) {
      dateRef.current.value = posToDate(posRef.current);
      return;
    }
    posRef.current = dateTimeToPos(
      dateRef.current.value,
      posToTime(posRef.current)
    );
    updateControls();
  }
  function timeKeyDown(e) {
    if (e.key !== "Enter") {
      return;
    }
    if (!isValidTime(timeRef.current.value)) {
      timeRef.current.value = posToTime(posRef.current);
      return;
    }
    posRef.current = dateTimeToPos(
      posToDate(posRef.current),
      timeRef.current.value
    );
    updateControls();
  }
  function timeOnBlur(e) {
    if (!isValidTime(timeRef.current.value)) {
      timeRef.current.value = posToTime(posRef.current);
      return;
    }
    posRef.current = dateTimeToPos(
      posToDate(posRef.current),
      timeRef.current.value
    );
    updateControls();
  }

  function jDayKeyDown(e) {
    if (e.key !== "Enter") {
      return;
    }
    if (!isNumeric(julianDayRef.current.value)) {
      julianDayRef.current.value = posToJulianDay(posRef.current);
      return;
    }
    posRef.current = julianDayTimeToPos(
      julianDayRef.current.value,
      posToTime(posRef.current)
    );
    updateControls();
  }
  function jDayOnBlur(e) {
    if (!isValidTime(timeRef.current.value)) {
      timeRef.current.value = posToTime(posRef.current);
      return;
    }
    posRef.current = dateTimeToPos(
      posToDate(posRef.current),
      timeRef.current.value
    );
    updateControls();
  }

  function runOnChange(e) {
    toggleRun(e.target.checked);
    updateControls();
  }

  const posDisplayRef = useRef();
  function posKeyDown(e) {
    if (e.key !== "Enter") {
      return;
    }
    posRef.current = posDisplayRef.current.value;
    updateControls();
  }

  const options = speedFactOptions;
  function speedFactChange(e) {
    setSpeedFact(Number(e.target.value));
    // console.log("speedFact: " + speedFact);
  }

  return (
    <div className="controls">
      <h2>The TYCHOSIUM</h2>
      <div className="controlGroup">
        <div className="control">
          <label hidden>Pos:</label>
          <input hidden ref={posDisplayRef} onKeyDown={posKeyDown} />
        </div>
        <div className="control">
          <label>Date:</label>
          <input ref={dateRef} onKeyDown={dateKeyDown} onBlur={dateOnBlur} />
        </div>
        <div className="control">
          <label>Time (UTC):</label>
          <input ref={timeRef} onKeyDown={timeKeyDown} onBlur={timeOnBlur} />
        </div>
        <div className="control">
          <label>Julian day:</label>
          <input
            ref={julianDayRef}
            onKeyDown={jDayKeyDown}
            onBlur={jDayOnBlur}
          />
        </div>
        <div className="control">
          <label>Run</label>
          <input type="checkbox" onChange={runOnChange} />
        </div>
        <div className="control">
          <button
            onClick={() => {
              posRef.current += speedFact;
              updateControls();

              // console.log(
              //   "posRef.current: " + posRef.current + " speedFact: " + speedFact
              // );
            }}
          >
            Step forward
          </button>
        </div>
        <div className="control">
          <button
            onClick={() => {
              posRef.current -= speedFact;
              updateControls();
            }}
          >
            Step backward
          </button>
        </div>

        <div className="control">
          <label>1 second equals</label>
          <select value={speedFact} onChange={speedFactChange}>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import styles from "./App.module.css";

export default function App() {
  const [slices, setSlices] = useState(
    Array(6).fill({ id: Math.random(), state: "" })
  );

  const [_animating, setAnimating] = useState(false);

  const handleSliceClick = (index: number) => {
    setAnimating(true);

    const updatedSlices = slices.map((slice, i) =>
      i === index ? { ...slice, state: "removing" } : slice
    );
    setSlices(updatedSlices);

    setTimeout(() => {
      setSlices((current) => current.filter((_, i) => i !== index));
      addSlice();
    }, 500);
  };

  const addSlice = () => {
    setSlices((currentSlices) => [
      ...currentSlices,
      { id: Math.random(), state: "adding" },
    ]);

    setTimeout(() => {
      setSlices((currentSlices) =>
        currentSlices.map((slice) =>
          slice.state === "adding" ? { ...slice, state: "" } : slice
        )
      );
      setAnimating(false);
    }, 500);
  };

  return (
    <div className={styles.roll}>
      {slices.map((slice, index) => (
        <div
          key={slice.id}
          className={`${styles.slice} ${styles[slice.state]}`}
          onClick={() => handleSliceClick(index)}
        ></div>
      ))}
    </div>
  );
}

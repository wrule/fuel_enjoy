import React, { useEffect, useState } from 'react';
import style from './index.module.scss';

export
function PixelCanvas(props: any) {
  const size = props.size ?? 10;
  const colors = ['white', 'black', 'pink', 'gray', 'cyan', 'blue', 'green', 'red', 'yellow'];

  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const randomCanvas = (size = 10) => {
    setPixels(Array(size).fill(0).map(() => Array(size).fill(0).map(() => randomColor())));
  };

  const [pixels, setPixels] = useState<string[][]>([]);

  useEffect(() => {
    randomCanvas();
  }, []);

  return <div className={style.com}>
    {pixels.map((row) => <div
      className={style.row}>
      {row.map((color) => <div
        className={style.cell}
        style={{ backgroundColor: color }}>
      </div>)}
    </div>)}
  </div>
}

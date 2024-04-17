import { useState } from 'react';
import "./Hex2rgbConverter.css";

interface colorData {
  hexValue: string,
  rgbValue: string,
  r: number, g: number, b: number
}

export const Hex2rgbConverter = () => {
  const [colorData, setColor] = useState({
    hexValue: "#FFFFFF",
    rgbValue: "rgb(255, 255, 255)",
    r: 255, g: 255, b: 255
  } as colorData);

  function getColorData(hexValue: string) {
    let result = { hexValue: hexValue, rgbValue: "Ошибка!", r: 255, g: 0, b: 0 };
    if (hexValue.length === 7 && hexValue.match(/#[a-f0-9]{6}/gi)) {
      const val = hexValue.match(/\w\w/g);
      if (val) {
        const [r, g, b] = val.map(x => parseInt(x, 16));
        result.rgbValue = `rgb(${r}, ${g}, ${b})`;
        result.r = r;
        result.g = g;
        result.b = b;
      }
    }
    return result;
  }

  const onChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const hexValue = ev.target.value;
    if (hexValue.length >= 7) {
      const colorData = getColorData(hexValue);
      setColor(colorData);
    } else {
      setColor({
        hexValue: colorData.hexValue,
        rgbValue: "rgb(?, ?, ?)",
        r: 255, g: 255, b: 255
      });
    }
  }

  function getBackgroundColor(val: colorData) {
    let hexValue = "";
    let rgbValue = "";
    switch (val.rgbValue) {
      case "Ошибка!": {
        hexValue = "#FF0000";
        rgbValue = "rgb(128,0,0)";
        break;
      }
      case "rgb(?, ?, ?)": {
        hexValue = "#FFFFFF";
        rgbValue = "rgb(128,128,128)";
        break;
      }
      default: {
        hexValue = val.hexValue;
        rgbValue = `rgb(${Math.round(val.r / 2)},${Math.round(val.g / 2)},${Math.round(val.b / 2)})`;
        break;
      }
    }
    const styles: React.CSSProperties[] = [
      { backgroundColor: hexValue },
      { backgroundColor: rgbValue }
    ];
    return styles;
  };

  return (
    <div className="converter-container" style={getBackgroundColor(colorData)[0]}>
      <form className="converter-form">
        <input className="hex-input" name="hexInput" type="text"
          defaultValue={colorData.hexValue} onChange={onChangeHandler} />
        <div className="rgb-color" style={getBackgroundColor(colorData)[1]}>{colorData.rgbValue}</div>
      </form>
    </div>
  );
}

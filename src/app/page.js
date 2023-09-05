"use client";
import Board from "@/components/Board";
import Toolbar from "@/components/Toolbar";
import { useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [color, setColor] = useState("#ffffff");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");
  const [canvasColor, setCanvasColor] = useState("#121212");
  const [strokeWidth, setStrokeWidth] = useState(5);

  return (
    <div className=" relative">
      <div className=" fixed top-0 z-20">
        <Toolbar
          color={color}
          setColor={setColor}
          tool={tool}
          setTool={setTool}
          history={history}
          setHistory={setHistory}
          elements={elements}
          setElements={setElements}
          canvasRef={canvasRef}
          canvasColor={canvasColor}
          setCanvasColor={setCanvasColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
        />
      </div>
      <Board
        canvasRef={canvasRef}
        ctx={ctx}
        color={color}
        tool={tool}
        elements={elements}
        setElements={setElements}
        history={history}
        setHistory={setHistory}
        canvasColor={canvasColor}
        strokeWidth={strokeWidth}
      />
    </div>
  );
}

"use client";
import Board from "@/components/Board";
import Toolbar from "@/components/Toolbar";
import { useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");

  return (
    <div>
      <Toolbar
        color={color}
        setColor={setColor}
        tool={tool}
        setTool={setTool}
      />
      <Board
        canvasRef={canvasRef}
        ctx={ctx}
        color={color}
        tool={tool}
        elements={elements}
        setElements={setElements}
        history={history}
        setHistory={setHistory}
      />
    </div>
  );
}

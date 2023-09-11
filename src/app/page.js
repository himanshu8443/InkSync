"use client";
import Board from "@/components/Board";
import Toolbar from "@/components/Toolbar";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function Home({ params }) {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [color, setColor] = useState("#ffffff");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");
  const [canvasColor, setCanvasColor] = useState("#121212");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [socket, setSocket] = useState(null);
  const [userName, setUserName] = useState("Anonymous");
  const [isLive, setIsLive] = useState(false);
  const [messages, setMessages] = useState([]);

  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "Anonymous");
    if (params?.roomId?.toString().length !== 20) {
      setIsLive(false);
      return;
    }
    setIsLive(true);
    const socket = io(server, connectionOptions);
    setSocket(socket);
    socket.on("updateCanvas", (data) => {
      setElements(data.updatedElements);
      setCanvasColor(data.canvasColor);
    });

    socket.on("getMessage", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // ping server every 2 min to prevent render server from sleeping
    socket.on("ping", () => {
      settimeout(() => {
        socket.emit("pong");
      }, 120000);
    });

    const data = {
      roomId: params.roomId,
      userName: userName,
    };
    socket.emit("joinRoom", data);

    return () => {
      socket.off("updateCanvas");
    };
  }, []);

  const sendMessage = (message) => {
    const data = {
      message: message,
      userName: userName,
      roomId: params.roomId,
      socketId: socket.id,
    };
    if (socket) {
      socket.emit("sendMessage", data);
    }
  };

  const updateCanvas = (updatedElements) => {
    if (socket) {
      // console.log(updatedElements);
      const data = {
        roomId: params.roomId,
        userName: userName,
        updatedElements: updatedElements,
        canvasColor: canvasColor,
      };
      socket.emit("updateCanvas", data);
    }
  };

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
          userName={userName}
          setUserName={setUserName}
          isLive={isLive}
          setIsLive={setIsLive}
          params={params}
          updateCanvas={updateCanvas}
          messages={messages}
          sendMessage={sendMessage}
          socketId={socket?.id}
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
        updateCanvas={updateCanvas}
      />
    </div>
  );
}

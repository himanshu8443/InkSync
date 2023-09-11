'use client'

import Image from "next/image"
import { tools } from "@/assets"
import { TwitterPicker, SliderPicker } from "react-color"
import { useState } from "react"
import { LuUndo2, LuRedo2 } from "react-icons/lu"
import Menu from "./Menu"
import Session from "./Session"
import Chat from "./Chat"

const Toolbar = ({
    color,
    tool,
    setColor,
    setTool,
    elements,
    setElements,
    history,
    setHistory,
    canvasRef,
    strokeWidth,
    setStrokeWidth,
    canvasColor,
    setCanvasColor,
    userName,
    setUserName,
    isLive,
    setIsLive,
    params,
    updateCanvas,
    sendMessage,
    messages,
    socketId
}) => {
    const [showColorPicker, setShowColorPicker] = useState(false)

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = canvasColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        setElements([]);
        setHistory([]);
        updateCanvas([]);
    };

    const undo = () => {
        if (elements.length < 1) return;
        setHistory((prevHistory) => [
            ...prevHistory,
            elements[elements.length - 1],
        ]);
        setElements((prevElements) =>
            prevElements.filter((ele, index) => index !== elements.length - 1)
        );
    };
    const redo = () => {
        if (history.length < 1) return;
        setElements((prevElements) => [
            ...prevElements,
            history[history.length - 1],
        ]);
        setHistory((prevHistory) =>
            prevHistory.filter((ele, index) => index !== history.length - 1)
        );
    };

    return (
        <div className=" w-full z-20">
            <div className="flex flex-row p-5 justify-between w-[90vw] gap-5 md:gap-8 ">
                <Image src={"/logo.webp"} width={200} height={200} alt="logo" className=" select-none hidden md:block" />
                <div className="flex flex-row gap-4 md:gap-8">
                    <div className="flex flex-row-reverse md:flex-row bg-secondary rounded-lg p-1 gap-1 max-h-11">
                        {
                            tools.map((item, index) => (
                                <button title={item.title}
                                    key={index}
                                    className={`flex text-xl flex-col items-center rounded-lg justify-center p-2 border-black  cursor-pointer font-extrabold ${item.value === tool ? "bg-tertiary text-primary" : "text-[#A6ABBD] hover:bg-slate-600"}`}
                                    onClick={() => setTool(item.value)}
                                >
                                    {item.icon}
                                </button>
                            ))
                        }
                        <div className=" relative flex items-center justify-center " title="Pick color">
                            <div style={{ backgroundColor: color }} className="rounded-lg w-8 h-8 cursor-pointer" onClick={() => setShowColorPicker(true)}></div>
                            {
                                showColorPicker && (
                                    <div className="absolute top-12 left-0 flex flex-col ">
                                        <div className="fixed inset-0 z-30" onClick={() => setShowColorPicker(false)}></div>
                                        <TwitterPicker className=" z-40"
                                            color={color}
                                            onChangeComplete={(color) => setColor(color.hex)}
                                            colors={["#f44336", "#e91e63", "#f70707", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b", "#000000", "#ffffff"]}
                                        />
                                        <SliderPicker width="276px" className=" z-40" color={color} onChangeComplete={(color) => setColor(color.hex)} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-row bg-secondary rounded-lg p-1 gap-1 max-h-11">
                        <button onClick={undo} className="flex flex-col text-xl items-center rounded-lg justify-center p-2 border-black  cursor-pointer font-extrabold text-[#A6ABBD] hover:bg-slate-600 active:text-primary active:bg-tertiary">
                            <LuUndo2 />
                        </button>
                        <div className=" border-gray-400 border-r h-6 mt-[5px]" />
                        <button onClick={redo} className="flex text-xl flex-col items-center rounded-lg justify-center p-2 border-black  cursor-pointer font-extrabold text-[#A6ABBD] hover:bg-slate-600 active:text-primary active:bg-tertiary">
                            <LuRedo2 />
                        </button>
                    </div>
                    <div className="flex flex-row gap-5 max-h-11 max-sm:fixed bottom-4 left-4">
                        <Session userName={userName} setUserName={setUserName} isLive={isLive} setIsLive={setIsLive} params={params} />
                        <Chat isLive={isLive} params={params} sendMessage={sendMessage} messages={messages} socketId={socketId} />
                    </div>
                </div>
                <div />
                <Menu clearCanvas={clearCanvas} setStrokeWidth={setStrokeWidth} strokeWidth={strokeWidth} setCanvasColor={setCanvasColor} canvasColor={canvasColor} elements={elements} setElements={setElements} updateCanvas={updateCanvas} />
            </div>
        </div>
    )
}

export default Toolbar
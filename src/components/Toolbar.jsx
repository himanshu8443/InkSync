'use client'

import Image from "next/image"
import { tools } from "@/assets"
import { TwitterPicker, SliderPicker } from "react-color"
import { useState } from "react"
import { LuUndo2, LuRedo2 } from "react-icons/lu"
import { BiMenu } from "react-icons/bi"

const Toolbar = ({
    color,
    tool,
    setColor,
    setTool,
}) => {
    const [showColorPicker, setShowColorPicker] = useState(false)
    return (
        <div className=" absolute  top-0 w-full z-20">
            <div className="flex flex-row p-5 justify-between w-11/12 ">
                <Image src={"/ink.webp"} width={200} height={200} className=" select-none" />
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row bg-secondary rounded-lg p-1 gap-1">
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
                    <div className="flex flex-row bg-secondary rounded-lg p-1 gap-1">
                        <button className="flex flex-col text-xl items-center rounded-lg justify-center p-2 border-black  cursor-pointer font-extrabold text-[#A6ABBD] hover:bg-slate-600 active:text-primary active:bg-tertiary">
                            <LuUndo2 />
                        </button>
                        <div className=" border-gray-400 border-r h-6 mt-[5px]" />
                        <button className="flex text-xl flex-col items-center rounded-lg justify-center p-2 border-black  cursor-pointer font-extrabold text-[#A6ABBD] hover:bg-slate-600 active:text-primary active:bg-tertiary">
                            <LuRedo2 />
                        </button>
                    </div>
                </div>
                <div />
                <div className="flex fixed top-5 right-10 flex-row bg-secondary rounded-lg p-1 gap-1">
                    <button className="flex flex-col text-2xl items-center rounded-lg justify-center p-1 border-black  cursor-pointer font-extrabold text-[#A6ABBD] active:text-primary ">
                        <BiMenu />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Toolbar
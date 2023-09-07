'use client'
import { BiMenu } from "react-icons/bi"
import { useState } from "react"
import { MdDeleteOutline } from "react-icons/md"

const Menu = ({ clearCanvas, setStrokeWidth, strokeWidth, canvasColor, setCanvasColor }) => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div className="flex  fixed top-5 right-10 flex-row bg-secondary rounded-lg p-1 gap-1">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex flex-col text-2xl items-center rounded-lg justify-center p-1 border-black  cursor-pointer font-extrabold text-[#A6ABBD] active:text-primary ">
                <BiMenu />
            </button>
            {
                showMenu && (
                    <div className="absolute top-12 right-0 flex flex-col w-[150px] ">
                        <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)}></div>
                        <div className="relative text-[#b9bed0] flex flex-col bg-secondary rounded-lg p-2 gap-1 z-40">
                            <button onClick={clearCanvas} className="flex text-sm p-1 rounded-lg  border-black  cursor-pointer font-extrabold text-[#b9bed0] hover:bg-slate-600 active:text-primary active:bg-tertiary">
                                <MdDeleteOutline size={25} className=" text-pink-900" /> Clear Canvas
                            </button>
                            <hr className="border-gray-500" />
                            <label className=" text-[#b9bed0]" >
                                Stroke Width &nbsp; {strokeWidth}
                            </label>
                            <input onChange={
                                (e) => setStrokeWidth(e.target.value)
                            } type="range" value={strokeWidth} min={0} max="100" className="range range-[3px] cursor-pointer" />
                            <hr className="border-gray-500 mt-2" />
                            <p>Canvas Color</p>
                            <div className="flex flex-row gap-2">
                                <button onClick={() => setCanvasColor("#ffffff")} className={`w-8 h-8 rounded-lg bg-white  cursor-pointer ${canvasColor === "#ffffff" ? " border-primary border" : ''}`}></button>
                                <button onClick={() => setCanvasColor("#000000")} className={`w-8 h-8 rounded-lg bg-black cursor-pointer ${canvasColor === "#000000" ? " border-primary border" : ''}`}></button>

                                <button onClick={() => setCanvasColor("#1f3d36")} className={`w-8 h-8 rounded-lg bg-[#1f3d36] cursor-pointer ${canvasColor === "#1f3d36" ? " border-primary border" : ''}`}></button>

                                <button onClick={() => setCanvasColor("#121212")} className={`w-8 h-8 rounded-lg bg-[#121212] cursor-pointer ${canvasColor === "#121212" ? " border-primary border" : ''}`}></button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Menu
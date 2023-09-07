'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import live from "@/assets/live.svg"
import { useRouter } from "next/navigation"
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast"

const Session = ({ userName, setUserName, isLive, setIsLive, params }) => {
    const router = useRouter()
    const startSession = () => {
        setShow(false);
        const roomId = nanoid(20);
        router.push(`/room/${roomId}`);
    }
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (isLive) {
            setShow(true)
        }
    }, [isLive])
    return (
        <div className=' relative ml-10 left-24'>
            <div>
                {
                    isLive ? (
                        <button
                            onClick={() => {
                                setShow(!show)
                            }}
                            className='bg-red-400 hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full'>
                            Live Session
                        </button>
                    ) : (
                        <button
                            onClick={() => setShow(!show)}
                            className='bg-primary hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full'>
                            Live Session
                        </button>
                    )
                }

                {/* fixed div at center of screen */}
                {show && (
                    <div className='fixed inset-0 z-30'
                        onClick={() => setShow(!show)}
                    >
                        <div className='flex flex-col justify-center items-center h-screen'>
                            <div className='bg-secondary text-gray-200 rounded-lg p-5 w-[400px]'
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className='flex flex-row justify-between items-center'>
                                    <h1 className='text-2xl font-bold'>Live Session</h1>
                                    <button
                                        onClick={() => setShow(!show)}
                                        className=' hover:bg-opacity-70 text-xl text-white font-bold py-2 px-4 rounded-full'>
                                        X
                                    </button>
                                </div>
                                <div className='flex flex-col gap-4 items-center'>
                                    <Image src={live} width={100} height={100} className=" select-none hidden md:block" />
                                    <div className='flex flex-row gap-4'>
                                        {
                                            isLive ?
                                                (
                                                    <div className='flex flex-col gap-2'>
                                                        <div className=''>
                                                            <label className='text-sm font-bold'>Share Join Link</label>
                                                            <p className='text-sm text-gray-400'>Anyone with this link can join the session</p>
                                                        </div>
                                                        <div className='flex flex-row gap-2'>
                                                            <input value={`${window.location.origin}/room/${params.roomId}`}
                                                                type='text' readOnly className='border border-gray-300 text-gray-700 rounded-lg p-2 w-[300px] cursor-text appearance-none focus:outline-none' />
                                                            <button
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(`${window.location.origin}/room/${params.roomId}`);
                                                                    // toast('Copied to Clipboard',
                                                                    //     {
                                                                    //         icon: '📋',
                                                                    //         style: { borderRadius: '10px', background: '#333', color: '#fff' },
                                                                    //     }
                                                                    // )
                                                                }}
                                                                className="bg-primary hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full"
                                                            >
                                                                Copy
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) :
                                                (
                                                    <div className='flex flex-col gap-2'>
                                                        <label className='text-sm font-bold'>Your Name</label>
                                                        <input value={userName} onChange={(e) => setUserName(e.target.value)}
                                                            type='text'
                                                            placeholder='your Name'
                                                            className='border border-gray-300 text-gray-700 rounded-lg p-2 w-[300px]'
                                                        />

                                                    </div>)
                                        }
                                    </div>
                                    {
                                        isLive ? (
                                            <button
                                                onClick={() => { setIsLive(false), router.push(`/`) }}
                                                className="bg-red-500 hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full"
                                            >
                                                Stop Session
                                            </button>
                                        )
                                            : (
                                                <button
                                                    onClick={() => startSession()}
                                                    className='bg-primary hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full'>
                                                    Start
                                                </button>
                                            )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}



export default Session
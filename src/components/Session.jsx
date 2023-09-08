'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import live from "@/assets/live.svg"
import { useRouter } from "next/navigation"
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast"
import { IoClose } from "react-icons/io5"

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
        <div className=' relative lg:ml-10 lg:left-24'>
            <div>
                {
                    isLive ? (
                        <button
                            onClick={() => {
                                setShow(!show)
                            }}
                            className='bg-red-400 text-sm lg:text-base whitespace-nowrap hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full'>
                            Live Session
                        </button>
                    ) : (
                        <button
                            onClick={() => setShow(!show)}
                            className='bg-primary whitespace-nowrap hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full'>
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
                                <div className='flex flex-row justify-between items-center -mt-4'>
                                    <h1 className='text-2xl font-bold'>Live Session</h1>
                                    <button
                                        onClick={() => setShow(!show)}
                                        className=' hover:bg-opacity-70 relative left-4 text-xl cursor-pointer text-white font-bold py-2 px-4 rounded-full'>
                                        <IoClose size={30} />
                                    </button>
                                </div>
                                <div className={`flex flex-col gap-4 ${isLive ? 'items-start' : 'items-center'}`}>
                                    <div className='flex justify-center w-full'>
                                        <Image src={live} width={100} alt="Live" height={100} className=" select-none hidden md:block" />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label className='text-sm font-bold'>Your Name</label>
                                        <input value={userName} onChange={(e) => {
                                            setUserName(e.target.value);
                                            localStorage.setItem('userName', e.target.value);
                                        }}
                                            type='text'
                                            placeholder='your Name'
                                            className='border border-gray-300 text-gray-900 rounded-lg p-2 w-[300px]'
                                        />
                                    </div>
                                    {
                                        isLive &&
                                        (
                                            <div className='flex flex-col gap-2'>
                                                <div className=''>
                                                    <label className='text-sm font-bold'>Share Join Link</label>
                                                    <p className='text-sm text-gray-400'>Anyone with this link can join the session</p>
                                                </div>
                                                <div className='flex flex-row gap-2'>
                                                    <input value={`${window.location.origin}/room/${params.roomId}`}
                                                        type='text' readOnly className='border border-gray-300 text-gray-800 rounded-lg p-2 w-[300px] cursor-text appearance-none focus:outline-none' />
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(`${window.location.origin}/room/${params.roomId}`);
                                                            toast('Copied to Clipboard',
                                                                {
                                                                    icon: '📋',
                                                                    style: { borderRadius: '10px', background: '#333', color: '#fff' },
                                                                }
                                                            )
                                                        }}
                                                        className="bg-primary hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full"
                                                    >
                                                        Copy
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        isLive ? (
                                            <div className="flex justify-center w-full">
                                                <button
                                                    onClick={() => { setIsLive(false), router.push(`/`) }}
                                                    className="bg-red-500 hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full"
                                                >
                                                    Stop Session
                                                </button>
                                            </div>
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
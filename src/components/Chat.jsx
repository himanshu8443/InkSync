'use client'
import { useEffect, useState } from "react"
import { BsFillChatSquareTextFill } from "react-icons/bs"
import { IoClose } from "react-icons/io5"

const Chat = ({ isLive, sendMessage, messages, socketId }) => {
    const [chatMessage, setChatMessage] = useState([])
    const [unreadMessages, setUnreadMessages] = useState(0)
    const [show, setShow] = useState(false);


    useEffect(() => {
        if (!show && messages.length > 0 && messages[messages.length - 1].socketId !== socketId) {
            setUnreadMessages(unreadMessages + 1)
        }
    }, [messages]);

    useEffect(() => {
        if (show) {
            setUnreadMessages(0)
        }
    }, [show]);

    const handelSubmit = (e) => {
        e.preventDefault()
        if (chatMessage === '') return
        sendMessage(chatMessage); setChatMessage('')
    }

    return (
        <div className=' relative lg:ml-10 lg:left-24'>
            <div>
                {
                    isLive && (
                        <button
                            onClick={() => {
                                setShow(!show)
                            }}
                            className='bg-secondary hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full relative'>
                            <BsFillChatSquareTextFill className='text-2xl text-primary' />
                            {unreadMessages > 0 &&
                                <div className='absolute -top-1 -right-1 text-[12px] text-white font-bold bg-red-400 px-1 rounded-full'>
                                    {unreadMessages}
                                </div>
                            }
                        </button>
                    )
                }

                {/* fixed div at center of screen */}
                {show && (
                    <div className='md:absolute max-sm:fixed md:inset-0 max-sm:inset-5 z-30'>
                        <div className='flex flex-col justify-center items-center relative '>
                            <div className=" w-[400px] overflow-y-scroll overflow-x-visible bg-secondary  h-[80vh] hideScroll rounded-lg shadow-[0_2px_10px_rgba(73,_94,_142,_0.7)]">
                                <div className='text-gray-200 rounded-t-lg p-2  border-b-2 border-tertiary bg-primary'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className='flex flex-row justify-between items-center'>
                                        <h1 className='text-2xl font-bold'>Chat</h1>
                                        <button
                                            onClick={() => setShow(!show)}
                                            className=' hover:bg-opacity-70 cursor-pointer text-xl text-white font-bold py-2 px-4 rounded-full'>
                                            <IoClose size={30} />
                                        </button>
                                    </div>
                                </div>
                                <div className="rounded-b-lg p-2">
                                    <div className="flex flex-col mt-5">
                                        {
                                            messages.map((message, index) => (
                                                message.socketId === socketId ? (
                                                    <div key={index} className="flex justify-end mb-4">
                                                        <div
                                                            className="mr-2 py-3 px-4 bg-primary rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                        >
                                                            {message.message}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div key={index} className="flex flex-col items-start mb-4">
                                                        <p className=" text-xs text-gray-400" >
                                                            {message.userName}
                                                        </p>
                                                        <div
                                                            className="ml-2 py-3 px-4 bg-tertiary rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                                        >
                                                            {message.message}
                                                        </div>
                                                    </div>
                                                )
                                            ))
                                        }

                                    </div>
                                    <form onSubmit={handelSubmit}>
                                        <div className="py-5 absolute bottom-0 flex gap-2">
                                            <input value={chatMessage}
                                                onChange={(e) => { setChatMessage(e.target.value) }}
                                                className=" bg-gray-300 text-gray-800 placeholder:text-gray-500 py-2 focus:outline-0 px-3 rounded-xl w-[300px]"
                                                type="text"
                                                placeholder="type your message here..."
                                            />
                                            <button
                                                type="submit"
                                                className="bg-primary hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-full"
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Chat
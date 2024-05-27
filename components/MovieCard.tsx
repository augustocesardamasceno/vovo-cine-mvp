import { BsFillPlayFill } from 'react-icons/bs'
import FavoriteButton from '@/components/FavoriteButton'
import { useRouter } from 'next/router'
import useInfoModal from '@/hooks/useInfoModal'
import { BiChevronDown, BiPlay } from 'react-icons/bi'
import React, { useEffect, useRef } from 'react'
import { FaHandPointer } from 'react-icons/fa';
import useCurrentUser from '@/hooks/useCurrentUser';
import { AiOutlineMessage } from 'react-icons/ai'

interface MovieCardProps {
    data: Record<string, any>
}


export default function MovieCards({ data }: MovieCardProps) {
    const router = useRouter()
    const { openModal } = useInfoModal()
    const [isModalVisible, setModalVisible] = React.useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const { data: currentUser } = useCurrentUser();

    const isFavorite = currentUser?.favoriteIds?.includes(data?.id);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setModalVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <div className='group bg-zinc-900 col-span-1 relative p-2' onClick={toggleModal} >
            <img
                className='
                    cursor-pointer
                    object-cover
                    transition
                    duration-150
                    shadow-xl
                    rounded-md
                    group-hover:opacity-90
                    sm:group-hover:opacity-0
                    delay-300
                    w-full
                    h-[50vw] sm:h-[20vw] md:h-[15vw] lg:h-[15vw]
                    brightness-[45%]
                '
                src={data?.thumbnailUrl}
                alt='Thumbnail'
            />
            <div className='absolute top-[18%] md:top-[40%] lg:top-[28%] ml-5 md:ml-8 '>
                <p className='text-white text-2xl xs:text-4xl sm:text-sm md:text-1xl lg:text-2xl xl:text-2xl h-full w-[90%] font-bold drop-shadow-xl'>
                    {data?.title}
                </p>
                <button
                    className='
                            md:hidden
                            sm:hidden
                            mt-4
                            bg-black
                            text-white
                            bg-opacity-80
                            rounded-md
                            md:py-2
                            px-2 md:px-4
                            w-auto
                            text-xs lg:text-lg
                            font-semibold
                            flex
                            flex-row
                            items-center
                            hover:bg-opacity-20
                            transition
                        '
                >
                    <FaHandPointer className='mr-2' />
                    Assitir ou saber mais
                </button>
            </div>
            <div
                className='
                    hidden sm:block
                    opacity-0
                    absolute
                    top-0
                    transition
                    duration-200
                    z-10
                    invisible
                    sm:visible
                    delay-300
                    w-full
                    scale-0
                    group-hover:scale-110
                    group-hover:-translate-y-[6vw]
                    group-hover:translate-x-[0vw]
                    group-hover:opacity-100
                '
            >
                <img
                    className='
                        cursor-pointer
                        object-cover
                        transition
                        duration-150
                        shadow-xl
                        rounded-t-md
                        w-full
                        h-[12vw]
                        brightness-[40%]
                    '
                    src={data?.thumbnailUrl}
                    alt='Thumbnail'
                />
                <div className='absolute top-[30%] md:top-[20%] ml-2 md:ml-8 '>
                    <p className='text-white text-sm md:text-xl h-full w-[90%] font-bold drop-shadow-xl'>
                        {data?.title}
                    </p>

                </div>

                <div
                    className='
                        z-10
                        bg-zinc-800
                        p-2
                        lg:px-4
                        absolute
                        w-full
                        transition
                        shadow-md
                        rounded-b-md
                    '
                >
                    <div className='flex flex-row items-center gap-3'>
                        <div
                            className='
                                cursor-pointer
                                w-6
                                h-6
                                lg:w-10
                                lg:h-10
                                bg-white
                                rounded-full
                                flex
                                justify-center
                                items-center
                                transition
                                hover:bg-neutral-300
                            '
                            onClick={() => router.push(`/watch/${data?.id}`)}
                        >
                            <BsFillPlayFill size={30} />
                        </div>
                        <FavoriteButton movieId={data?.id} />
                        <div
                            onClick={() => openModal(data?.id)}
                            className='
                                cursor-pointer
                                ml-auto
                                group/item
                                w-6
                                h-6
                                lg:w-10
                                lg:h-10
                                border-white
                                border-2
                                rounded-full
                                flex
                                justify-center
                                items-center
                                transition
                                hover:border-neutral-300
                            '
                        >
                            <BiChevronDown size={30} className='text-white group-hover/item:text-neutral-300' />
                        </div>
                    </div>
                    {/*<p className='text-white-400 font-semibold mt-2'>
                        <span className='text-white'>{data.title}</span>
                    </p>*/}
                    <div className='flex flex-row gap-2 items-center mt-2'>
                        <p className='text-white text-[10px] lg:text-sm'>{data?.duration}</p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className='text-white text-[10px] lg:text-sm'>{data?.genre}</p>
                    </div>
                </div>
            </div>
            <div ref={modalRef}
                className={`sm:hidden absolute top-0 transition duration-200 z-10 delay-200 w-[91%] scale-0 ${isModalVisible ? 'scale-110 translate-x-[4vw] opacity-100' : 'opacity-0'
                    }`}
                onClick={() => setModalVisible(!isModalVisible)}
            >
                <img
                    className='
                        cursor-pointer
                        object-cover
                        transition
                        duration-150
                        shadow-xl
                        rounded-t-md
                        w-full
                        h-[30vw]
                        brightness-[40%]
                    '
                    src={data?.thumbnailUrl}
                    alt='Thumbnail'
                />
                <div className='absolute top-[30%] md:top-[50%] ml-2 md:ml-8 '>
                    <p className='text-white text-xl md:text-2xl h-full w-[90%] font-bold drop-shadow-xl'>
                        {data?.title}
                    </p>
                </div>
                <div
                    className='
                        z-10
                        bg-zinc-800
                        p-2
                        lg:px-4
                        absolute
                        w-full
                        transition
                        shadow-md
                        rounded-b-md
                    '
                >
                    <div className='flex flex-row items-center gap-2'>

                        <button
                            className='
                            md:hidden
                            sm:hidden
                            
                            bg-black
                            text-white
                            bg-opacity-80
                            rounded-md
                            py-1 md:py-2
                            px-2 md:px-4
                            w-auto
                            text-sm lg:text-lg
                            font-semibold
                            flex
                            flex-row
                            items-center
                            hover:bg-opacity-20
                            transition
                        '
                            onClick={() => router.push(`/watch/${data?.id}`)}
                        >
                            <BiPlay size={15} className='text-white group-hover/item:text-neutral-300' />

                            Assitir
                        </button>
                        <button
                            onClick={() => openModal(data?.id)}
                            className='
                            md:hidden
                            sm:hidden
                            bg-black
                            text-white
                            bg-opacity-80
                            rounded-md
                            py-1 md:py-2
                            px-2 md:px-4
                            w-auto
                            text-xs lg:text-lg
                            font-semibold
                            flex
                            flex-row
                            items-center
                            hover:bg-opacity-20
                            transition
                        '
                        >
                            <div className='mr-1'><AiOutlineMessage size={15} className='text-white group-hover/item:text-neutral-300' /></div>
                            Sinopse
                        </button>
                        

                    </div>
                    {/*<p className='text-white-400 font-semibold mt-2'>
                        <span className='text-white'>{data.title}</span>
                    </p>*/}
                    <div className='flex flex-row gap-2 items-center mt-2'>
                        <p className='text-white text-md sm:text-lg xs:text-lg  text-[10px] lg:text-sm'>{data?.duration}</p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className='text-white text-md sm:text-lg xs:text-lg text-[10px] lg:text-sm'>{data?.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


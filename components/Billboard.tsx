import useBillboard from '@/hooks/useBillboard'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import PlayButton from '@/components/PlayButton'
import { useCallback } from 'react'
import useInfoModal from '@/hooks/useInfoModal'
import MovieCard from './MovieCard'



export default function Billboard() {
    const { data } = useBillboard()
    const { openModal } = useInfoModal()

    const handleOpenModal = useCallback(() => {
        openModal(data?.id)
    }, [openModal, data?.id])

    return (
        <div className='relative h-[56.26.vw]'>
            <div className='hidden sm:block'>
                <video
                    className='
                    w-full
                    h-[56.25vw]
                    object-cover
                    brightness-[50%]
                '
                    muted
                    loop
                    poster={data?.thumbnailUrl}
                    src={data?.videoUrl}
                >
                </video>
                <div className='absolute top-[30%] sm:top-[20%] md:top-[20%] ml-10 md:ml-16 '>
                    <p className='text-white text-4xl md:text-4xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
                        {data?.title}
                    </p>
                    <p className='hidden sm:block bg-black rounded-lg p-3 bg-opacity-50 text-white font-semibold text-2xs md:text-lg lg:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
                        {data?.description}
                    </p>
                    <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
                        <PlayButton movieId={data?.id} />
                        <button
                            onClick={handleOpenModal}
                            className='
                            bg-white
                            text-white
                            bg-opacity-30
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
                            <AiOutlineInfoCircle className='mr-1' />
                            Sobre o filme
                        </button>
                    </div>
                </div>
            </div>
            <div className='sm:hidden'>
                <div className='px-4 md:px-12 mt-4 space-y-8'>
                    <div>
                        <p className='text-white text-xl lg:text-2xl font-semibold mb-4'>
                            Sugestão do dia
                        </p>
                        <div className='grid grid-cols-1 gap-2'>
                            <MovieCard data={data} />
                            <PlayButton movieId={data?.id} />
                        
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}



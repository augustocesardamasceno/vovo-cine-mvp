import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import useMovie from '@/hooks/useMovie'

export default function Watch() {
    const router = useRouter()
    const { movieId } = router.query

    const { data } = useMovie(movieId as string)

    // Função para converter URL do YouTube para formato de embed
    const getYoutubeEmbedUrl = (youtubeUrl: string | URL) => {
        const url = new URL(youtubeUrl);
        const videoId = url.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <div className='h-screen w-screen bg-black'>
            <nav
                className='
                    fixed
                    w-full
                    p-4
                    z-10
                    flex
                    flex-row
                    items-center
                    gap-8
                    bg-black
                    bg-opacity-70
                '
            >
                <AiOutlineArrowLeft
                    onClick={() => router.push('/')}
                    className='text-white cursor-pointer'
                    size={40}
                />
                <p className='text-white text-xl md:text-3xl font-bold'>
                    <span className='font-light'>
                        Watching:
                    </span>
                    {data?.title}
                </p>
            </nav>
            <iframe
                className='h-full w-full'
                src={data?.videoUrl ? getYoutubeEmbedUrl(data.videoUrl) : ''}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}

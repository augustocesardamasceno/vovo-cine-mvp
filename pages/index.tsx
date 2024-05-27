import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

import Navbar from '@/components/Navbar'
import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList'
import useMovieList from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites'
import InfoModal from '@/components/InfoModal'
import useInfoModal from '@/hooks/useInfoModal'


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

export default function Home() {
    const { data:movies = [] } = useMovieList()
    const { data:favorites = [] } = useFavorites()
    const { isOpen, closeModal } = useInfoModal()

    return (
        <>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <div className='pb-10'>
                <Navbar />
                <div className='hidden sm:block'>
                <Billboard />
                </div>
            </div>
            <div className='sm:hidden pt-5'>
            <Billboard />
            </div>
            
            
            <div className='pb-40'>
                <MovieList title='Grandes sucessos' data={movies} />
                <div className='pt-10'>
                    <MovieList title='Meus filmes favoritos' data={favorites} />
                </div>
                
            </div>
        </>
    )
}

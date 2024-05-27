import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

import Navbar from '@/components/Navbar'
import useMovieList from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites'
import InfoModal from '@/components/InfoModal'
import useInfoModal from '@/hooks/useInfoModal'
import { useEffect, useState } from 'react'
import SearchResults from '@/components/SearchResult'
import GenreCarousel from '@/components/GenreCaroussel'


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
    const { data: movies = [] } = useMovieList()
    const { data: favorites = [] } = useFavorites()
    const { isOpen, closeModal } = useInfoModal()
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    // Atualizar os filmes filtrados sempre que o searchTerm mudar
    useEffect(() => {
        if (searchTerm) {
            const filtered = movies.filter((movie: { title: string }) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredMovies(filtered);
        } else {
            setFilteredMovies(movies);
        }
    }, [searchTerm, movies]);

    return (
        <>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <div className='pb-10'>
                <Navbar />

            </div>

            <div className='p-5'>
                <h1 className='text-white text-2xl lg:text-2xl font-semibold mb-4 pt-5 md:pt-16 px-4'>Procurar filme</h1>
                <input
                    type="text"
                    placeholder="Digite para buscar..."
                    className="text-2xl p-2 rounded-md px-4 ml-4 w-4/5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchResults data={movies} searchTerm={searchTerm} />

            </div>
            <div>
                <GenreCarousel data={movies} title="Ação" genre="Ação" />
                <GenreCarousel data={movies} title="Comédia" genre="Comédia" />
                <GenreCarousel data={movies} title="Romance" genre="Romance" />
            </div>


            
        </>
    )
}

import axios from 'axios'
import { useCallback, useMemo } from 'react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'

import useFavorites from '@/hooks/useFavorites'
import useCurrentUser from '@/hooks/useCurrentUser'

interface FavoriteButtonProps {
    movieId: string
}

export default function FavoriteButton({ movieId }: FavoriteButtonProps) {
    const { mutate: mutateFavorites } = useFavorites()
    const { data: currentUser, mutate } = useCurrentUser()

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(movieId)
    }, [currentUser, movieId])

    const toggleFavorites = useCallback(async  () => {
        let response

        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data: { movieId } })
        } else {
            response = await axios.post('/api/favorite', { movieId })
        }

        const updatedFavoritesIds = response?.data?.favoriteIds

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoritesIds
        })

        mutateFavorites()

    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

    const Icon = isFavorite ? AiOutlineClose : AiOutlinePlus

    return (
        <div
            onClick={toggleFavorites}
            className='
                cursor-pointer
                group/item
                w-4
                h-4
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
            <Icon className='text-white' size={15} />
        </div>
    )
}


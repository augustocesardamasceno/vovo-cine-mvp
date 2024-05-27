import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from 'react-slick';
import isEmpty from 'lodash/isEmpty';
import MovieCard from '@/components/MovieCard';

interface GenreCarouselProps {
    data: Record<string, any>[];
    title: string;
    genre: string;
}

const GenreCarousel = ({ data, title, genre }: GenreCarouselProps) => {
    // Filtrar filmes por gênero
    const genreFilteredMovies = data.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());

    if (isEmpty(genreFilteredMovies)) return null;

    // Configurações para o carrossel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='mx-8 md:px-12 mt-4'>
            <h2 className='text-white text-xl lg:text-2xl font-semibold mb-4'>{title}</h2>
            <Slider {...settings}>
                {genreFilteredMovies.map((movie) => (
                    <div key={movie.id} className="p-2 sm:text-md">
                        <MovieCard data={movie} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default GenreCarousel;

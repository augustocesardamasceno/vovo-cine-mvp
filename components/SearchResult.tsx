import { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import MovieCard from '@/components/MovieCard';

interface SearchResultsProps {
    data: Record<string, any>[];
    searchTerm: string;
}

export default function SearchResults({ data, searchTerm }: SearchResultsProps) {
    const [filteredData, setFilteredData] = useState<Record<string, any>[]>([]);
    
    useEffect(() => {
        if (searchTerm) {
            const results = data.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 5); // Limita a 5 resultados para não sobrecarregar a interface
            setFilteredData(results);
        } else {
            setFilteredData([]);
        }
    }, [searchTerm, data]);

    if (isEmpty(filteredData)) return null;

    return (
        <div className='px-4 md:px-12 mt-4 space-y-8'>
            <div>
                <p className='text-white text-xl lg:text-2xl font-semibold mb-4'>Resultados da busca</p>
                <div className='grid grid-cols-1 sm:grid-cols-4 gap-2'>
                    {filteredData.map((movie) =>
                        <MovieCard key={movie.id} data={movie} />
                    )}
                </div>
            </div>
        </div>
    );
}

import { useContext } from 'react';
import { MovieContext } from '../contexts/MovieContext';
import { Button } from './Button';

export function SideBar() {
  
  const { genres, handleSelectGenre, selectedGenreId } = useContext(MovieContext);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}
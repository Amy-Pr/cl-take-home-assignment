import { useState } from 'react';

import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';
import { ImageDetailsPage } from './ImageDetailsPage';

import './App.css';

export function App() {
	const [data, setData] = useState([]);
	const [selectedArtwork, setSelectedArtwork] = useState('');

	function onSearchSubmit(query) {
		setSelectedArtwork(null); // reset selected artwork
		searchArtworks(query).then((json) => {
			// console.log(json.data);
			setData(json.data);
		});
	}

	// function onBackClick() {
	// 	setSelectedArtwork(null);
	// }

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>

			{selectedArtwork ? (
				<ImageDetailsPage
					artwork={data.find((artwork) => artwork.image_id === selectedArtwork)}
					// onBackClick = {onBackClick}
				/>
			) : (
				<>
					<SearchForm onSearchSubmit={onSearchSubmit} />a
					<ul>
						{data.map(({ image_id, artist_title, title }) => (
							<li
								key={image_id}
								role="none"
								onClick={() => setSelectedArtwork(image_id)}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										setSelectedArtwork(image_id);
									}
								}}
							>
								<h3>
									{title}, by {artist_title}
								</h3>
							</li>
						))}
					</ul>
				</>
			)}
			<Footer />
		</div>
	);
}

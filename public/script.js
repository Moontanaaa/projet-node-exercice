const musicList = document.getElementById('music-list');
const musicForm = document.getElementById('add-music-form');
const nameInput = document.getElementById('name');
const authorInput = document.getElementById('author');
const genreInput = document.getElementById('genre');


function displayMusics(musics) {
    musicList.innerHTML = '';  

    musics.forEach((music) => {
        const musicCard = document.createElement('div');
        musicCard.className = 'bg-gray-800 p-4 rounded-lg flex flex-col items-center';

        musicCard.innerHTML = `
            <h3 class="text-xl font-semibold">${music.nom}</h3>
            <p class="text-gray-400">${music.auteur}</p>
            <p class="text-gray-500">${music.genre}</p>
        `;

        musicList.appendChild(musicCard);
    });
}


async function fetchMusics() {
    try {
        const response = await fetch('http://localhost:8000/api/musics');  
        const data = await response.json();


        if (data) {
            displayMusics(data);
        }
    } catch (error) {
        console.error('Error fetching musics:', error);
    }
}


musicForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newMusic = {
        name: nameInput.value,
        author: authorInput.value,
        genre: genreInput.value,
    };

    try {
        const response = await fetch('/musics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMusic),
        });

        const data = await response.json();
        

        if (data) {
            displayMusics(data);
        }


        nameInput.value = '';
        authorInput.value = '';
        genreInput.value = '';
    } catch (error) {
        console.error('Error adding music:', error);
    }
});


window.addEventListener('DOMContentLoaded', fetchMusics);




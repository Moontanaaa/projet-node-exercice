import React, { useState, useEffect } from "react";
import './MusicApp.css';

const MusicApp = () => {
  const [musics, setMusics] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    genre: "",
  });

  const apiUrl = "http://localhost:8000/api/musics";

  useEffect(() => {
    const fetchMusics = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMusics(data.message ? [] : data);
      } catch (error) {
        console.error("Erreur lors de la récupération des musiques :", error);
      }
    };
    fetchMusics();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.author || !formData.genre) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          author: formData.author,
          genre: formData.genre,
        }),
      });

      if (response.ok) {
        alert("Musique ajoutée avec succès");
        setFormData({ name: "", author: "", genre: "" });
        const newMusic = await response.json();
        setMusics((prevMusics) => [...prevMusics, newMusic]);
      } else {
        alert("Échec de l'ajout de la musique");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la musique :", error);
    }
  };

  return (
    <div className="bg-primary text-white flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl p-8 bg-gray-800 rounded-xl shadow-spotify space-y-8">
        <h1 className="text-4xl font-semibold text-center text-highlight">Ma Collection de Musiques</h1>

        <div id="music-list" className="space-y-6">
          {musics.length === 0 ? (
            <p className="text-center text-gray-300">Aucune musique trouvée</p>
          ) : (
            musics.map((music) => (
              <div key={music.id} className="card-music p-4 rounded-lg shadow-md space-y-2">
                <h3 className="text-xl font-bold text-gray-200">{music.name}</h3>
                <p className="text-gray-400">{music.author}</p>
                <p className="text-gray-500 text-sm">Genre: {music.genre}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6 bg-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-highlight">Ajouter une nouvelle chanson</h2>
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nom de la chanson"
              className="input-field w-full px-6 py-3 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Auteur"
              className="input-field w-full px-6 py-3 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <input
              type="text"
              id="genre"
              value={formData.genre}
              onChange={handleInputChange}
              placeholder="Genre"
              className="input-field w-full px-6 py-3 rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="button-primary w-full px-6 py-3 rounded-lg font-semibold transition duration-200 ease-in-out"
            >
              Ajouter de la musique
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default MusicApp;


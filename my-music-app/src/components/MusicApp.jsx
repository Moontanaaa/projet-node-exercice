import React, { useState, useEffect } from "react";

const MusicApp = () => {
  const [musics, setMusics] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    auteur: "",
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
        console.error("Error fetching musics:", error);
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

    if (!formData.nom || !formData.auteur || !formData.genre) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: formData.nom,
          auteur: formData.auteur,
          genre: formData.genre,
        }),
      });

      if (response.ok) {
        alert("Music added successfully");
        setFormData({ nom: "", auteur: "", genre: "" });
        const newMusic = await response.json();
        setMusics((prevMusics) => [...prevMusics, newMusic]);
      } else {
        alert("Failed to add music");
      }
    } catch (error) {
      console.error("Error adding music:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl p-8 bg-gray-800 rounded-xl shadow-2xl space-y-8">
        <h1 className="text-4xl font-semibold text-center text-gray-100">My Music Collection</h1>

        {/* Music List */}
        <div id="music-list" className="space-y-6">
          {musics.length === 0 ? (
            <p className="text-center text-gray-300">No music found</p>
          ) : (
            musics.map((music) => (
              <div key={music.id} className="bg-gray-700 p-4 rounded-lg shadow-md space-y-2">
                <h3 className="text-xl font-bold text-gray-200">{music.nom}</h3>
                <p className="text-gray-400">{music.auteur}</p>
                <p className="text-gray-500 text-sm">Genre: {music.genre}</p>
              </div>
            ))
          )}
        </div>

        {/* Add Music Form */}
        <form onSubmit={handleFormSubmit} className="space-y-6 bg-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-100">Add a New Song</h2>
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <input
              type="text"
              id="nom"
              value={formData.nom}
              onChange={handleInputChange}
              placeholder="Song Name"
              className="w-full px-6 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              id="auteur"
              value={formData.auteur}
              onChange={handleInputChange}
              placeholder="Author"
              className="w-full px-6 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <input
              type="text"
              id="genre"
              value={formData.genre}
              onChange={handleInputChange}
              placeholder="Genre"
              className="w-full px-6 py-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold transition duration-200 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Add Music
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MusicApp;


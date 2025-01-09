import React, { useState, useEffect } from "react";

const PostApp = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const apiUrl = "http://localhost:8000/api/posts";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPosts(data.message ? [] : data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    };
    fetchPosts();
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

    if (!formData.title || !formData.body) {
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
          title: formData.title,
          body: formData.body,
        }),
      });

      if (response.ok) {
        alert("Post ajouté avec succès");
        setFormData({ title: "", body: "" });
        const newPost = await response.json();
        setPosts((prevPosts) => [...prevPosts, newPost]);
      } else {
        alert("Échec de l'ajout du post");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du post :", error);
    }
  };

  return (
    <div className="bg-black text-white flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-8 bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-lg">
        <h1 className="text-5xl font-extrabold text-center text-green-400">Ma Collection d'Articles</h1>

        {/* Liste des posts */}
        <div id="post-list" className="space-y-6 mt-8">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400">Aucun article trouvé</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-800 p-6 rounded-lg shadow-md transition hover:scale-105 hover:bg-gray-700"
              >
                <h3 className="text-2xl font-bold text-green-300">{post.title}</h3>
                <p className="text-gray-300 mt-2">{post.body}</p>
              </div>
            ))
          )}
        </div>

        {/* Formulaire d'ajout d'article */}
        <form onSubmit={handleFormSubmit} className="mt-10 space-y-6 bg-gray-900 p-6 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-green-400">Ajouter un nouvel article</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Titre de l'article"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <textarea
              id="body"
              value={formData.body}
              onChange={handleInputChange}
              placeholder="Contenu de l'article"
              rows="4"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-green-500 text-white font-semibold text-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition transform hover:scale-105"
          >
            Ajouter un article
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostApp;



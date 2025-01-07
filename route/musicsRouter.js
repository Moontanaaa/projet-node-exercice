import { Router } from "express";
import { musics } from "../data/musics";

export const musicsRouter = Router()

app.get('/', (req, res) => {
    res.send(`Welcome to my API`);
});

app.get('/musics', (req, res) => {
    res.json(musics);
});

app.get('/musics/:id', (req, res) => {
    let { id } = req.params
    try {
        const musicById = musics.find(music => music.id === parseInt(id))
        if (!musicById) {
            return res.status(403).json({ message: "music not found" })
        }
        return res.status(200).json(musicById)
    }
    catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }
});

app.post('/musics', (req, res) => {
    let { name, author, genre } = req.body
    try {
        if (!name || !author || !genre) {
            return res.status(401).json({ message: "required for all" })
        }
        const newMusic = {
            id: musics.length + 1,
            name,
            author,
            genre,
        }
        musics.push(newMusic)
        return res.status(201).json(musics)
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

app.put('/musics/:id', (req, res) => {
    const { id } = req.params;
    const { name, author, genre } = req.body;

    try {
        const musicIndex = musics.findIndex(music => music.id === parseInt(id));

        if (musicIndex === -1) {
            return res.status(404).json({ message: "not find" });
        }

        if (!name || !author || !genre) {
            return res.status(400).json({ message: "Required" });
        }

        musics[musicIndex] = {
            id: musics[musicIndex].id,
            name,
            author,
            genre,
        };

        app.delete('/musics/:id', (req, res) => {
            const { id } = req.params;

            try {
                const musicIndex = musics.findIndex(music => music.id === parseInt(id));

                if (musicIndex === -1) {
                    return res.status(404).json({ message: "Musique non trouvée" });
                }

                musics.splice(musicIndex, 1);

                return res.status(200).json({ message: "Musique supprimée avec succès" });
            } catch (err) {
                return res.status(500).json({ message: "Erreur interne du serveur" });
            }
        });


        return res.status(200).json(musics[musicIndex]);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
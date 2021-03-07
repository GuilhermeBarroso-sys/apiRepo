const express = require("express");
const app = express();
const { uuid, isUuid} = require("uuidv4");
const cors = require("cors");
const { json } = require("express");

app.use(express.json());
app.use(cors());
const repositories = [];
app.get("/repositories",(request, response) => {
    const {title} = request.query;
    const results = title
    ?  repositories.filter(repository => repository.title.includes(title))
    :  repositories;
    return response.status(200).json(results);
    
})
app.post("/repositories",(request, response) => {
    const {title, author} = request.body;
    const newRep = {id: uuid(), title, author}
    repositories.push(newRep);
    return response.json(repositories);
})  
app.put("/repositories/:id",(request, response) => {
    const {id} = request.params;
    const {title, author} = request.body;
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if(repositoryIndex < 0) {
        return response.status(400).json({error: "Project doens't exist!"});
    }
    const rep = {
        id: id,
        title: title,
        author: author
    }
    repositories[repositoryIndex] = rep;
    return response.status(200).json(repositories[repositoryIndex]);

})
app.delete("/repositories/:id",(request, response) => {
    const {id} = request.params;
  
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if(repositoryIndex < 0) {
        return response.status(400).json({error: "Project doens't exist!"});
    }
    
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();

})

app.listen(3333, () => {
    console.log("Server is running!");
})


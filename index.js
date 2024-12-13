const {agregarPost, obtenerPost,agregarLike,borrarPost}= require('./consultas')
const express = require('express');
const app = express ();
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./index.html")
  })

app.get('/posts',async (req,res)=>{
  try {
    const posts = await obtenerPost();
    res.json(posts);
  } catch (error) {
    res.send(error.message);
  }
})

app.post('/posts',async (req,res)=>{
  try {
    const {titulo,img,descripcion,likes} = req.body;
    await agregarPost(titulo,img,descripcion,likes);
    res.status(200).send('Post agregado con exito');

  } catch (error) {
    res.status(404).send(error.message);
  }
})

app.put('/posts/like/:id',async (req,res)=>{
  try {
    const {id}= req.params;
    await agregarLike(id);
    res.status(200).send('Like agregado');
  } catch (error) {
    res.status(404).send(error.message);
  }
})

app.delete('/posts/:id',async (req,res)=>{
  try {
    const {id}=req.params;
    await borrarPost(id);
    res.status(200).send ('Post borrado');
  } catch (error) {
    res.status(404).send(error.message);
  }
})

app.listen(3000, console.log('Servidor encendido'));
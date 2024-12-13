const { Pool }= require('pg');
const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'likeme',
  password: '1204',
  allowExitOnIdle: true,
})


const agregarPost = async (titulo,img,descripcion,likes) =>{
  try {
    const consulta = "INSERT INTO posts VALUES (DEFAULT,$1,$2,$3,$4)";
    const values = [titulo,img,descripcion,0];
    const result = await pool.query(consulta,values);

  } catch (error) {
    throw new Error("Problema al agregar el post");
  }
}

const obtenerPost=async()=> {
  try {
    const { rows }= await pool.query("SELECT * FROM posts");
    return rows;

  } catch (error) {
    throw new Error("Problema al obtener los posts");
  }
}


const agregarLike=async(id)=>{
  try {
    const consulta="UPDATE posts SET likes=likes+1 WHERE id=$1";
    const values=[id];
    const result = await pool.query(consulta,values);
    if (result.rowCount!=0){
      return true
    } else{
      throw new Error("No se pudo agregar like");
    }
  } catch (error) {
    throw new Error(error);
  }
}

const borrarPost=async(id)=>{
  try {
    const consulta="DELETE FROM posts WHERE id=$1";
    const values=[id];
    const result=await pool.query(consulta,values);
    
  } catch (error) {
    throw new Error("Problema al eliminar el post");
  }
}



module.exports={agregarPost,obtenerPost, agregarLike, borrarPost}
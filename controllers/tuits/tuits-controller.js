import * as tuitsDao from './tuits-dao.js'

const createTuit = async (req, res) => {
  const newTuit = req.body;
  newTuit.likes = 0;
  newTuit.liked = false;
  const insertedTuit = await tuitsDao.createTuit(newTuit);
  res.json(insertedTuit);
}


const findTuits = async (req, res) => {
  try {
    const tuits = await tuitsDao.findTuits();
    console.log("here 3333" + tuits.length);
    res.json(tuits);
  } catch (err) {
    res.sendStatus(503);
  }
}


const updateTuit = async (req, res) => {
  const tuitdIdToUpdate = req.params.tid;
  const updates = req.body;

  const status = await tuitsDao
      .updateTuit(tuitdIdToUpdate,
          updates);
  res.json(status);
}



const deleteTuit = async(req, res) => {
  const tuitdIdToDelete = req.params.tid;
  const status = await tuitsDao
      .deleteTuit(tuitdIdToDelete);

  res.json(status);
}



export default (app) => {
  app.post('/api/tuits', createTuit);
  app.get('/api/tuits', findTuits);
  app.put('/api/tuits/:tid', updateTuit);
  app.delete('/api/tuits/:tid', deleteTuit);
}


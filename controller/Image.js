const handleImageEntry = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
        res.json(entries[0].entries)
    })
    .catch((err) => {
        console.log(err)
        res.status(400).json('cannot get entries')
    })
}

export default handleImageEntry
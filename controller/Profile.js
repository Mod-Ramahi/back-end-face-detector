const handleProfileGet = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0])
        }else{
            res.status(400).json('user not found')
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).json('cannot get user')
    })
}

export default handleProfileGet;
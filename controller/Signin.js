const handleSignin = (req, res, db, bcrypt) => {
    const {email, password}= req.body
    if(!email || !password){
        return res.status(400).json('wrong or empty fields')
    }
    db.select('email', 'hash').from('login')
    .where('email', '=' , req.body.email)
    .then(data => {
        if(data.length > 0) {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid) {
                return db.select('*')
                .from('users').where('email', '=', email)
                .then((user) => {
                    res.json(user[0]);
                })
                .catch((err) => {
                    res.status(500).json('unable to get user')
                    alert('something went wrong')
                })
            }else{
                res.status(400).json('wrong entries')
                alert('wrong entries')
            }
        }else{
            res.status(400).json('wrong entries')
            alert('wrong entries')
        }
    })
    .catch((err) => {
        res.status(400).json('wrong auth')
    })
};
export default handleSignin;
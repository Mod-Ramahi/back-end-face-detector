const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    const saltRounds = 10;

    if(!email || !name || !password){
        return res.status(400).json('wrong or empty fields')
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log(err)
            res.status(500).json('Error during salt generation')
            alert('something went wrong')
        } else {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    console.log(err)
                    res.status(500).json('error hashing password')
                    alert('something wrong with password hashing')
                } else {
                    db.transaction((trx) => {
                        trx.insert({
                            hash: hash,
                            email: email,
                        })
                            .into('login')
                            .returning('email')
                            .then((loginEmail) => {
                                trx('users').returning('*')
                                    .insert({
                                        name: name,
                                        email: loginEmail[0].email,
                                        joined: new Date(),
                                    })
                                    .then((user) => {
                                        res.json(user[0])
                                    }).catch((err) => {
                                        console.log(err)
                                        res.status(500).json('error while inserting user')
                                    })
                            })
                            .then(trx.commit)
                            .catch((err) => {
                                console.log(err)
                                trx.rollback()
                                res.status(500).json({message:'Errorr during transaction', err: err.message});
                            })
                    })
                        .catch((err) => {
                            // console.error(err); // Log the error for debugging purposes
                            res.status(500).json({message:'Errorrr during transaction', err: err.message});
                        });
                }
            })
        }
    });
}
export default handleRegister;
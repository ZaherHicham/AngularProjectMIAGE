let Utilisateur = require('../model/utilisateur');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function signup(req, res, next){
    console.log(req)
    bcrypt.hash(req.body.motDePasse, 10)
        .then(hash =>{
            const utilisateur = new Utilisateur({
                pseudo: req.body.pseudo,
                motDePasse: hash,
                isAdmin: req.body.isAdmin
            });
            utilisateur.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

function login(req, res, next){
    console.log(req.body)
    Utilisateur.findOne({pseudo: req.body.pseudo})
        .then(utilisateur => {
            if(!utilisateur){
                return res.status(401).json({error: 'Utilisateur non trouvé, avez vous déjà créé un compte?'});
            }
            bcrypt.compare(req.body.motDePasse, utilisateur.motDePasse) // on compare le mot de passe envoyé avec celui de la base de données
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({error: 'Mot de passe incorrect'});
                    }

                    res.status(200).json({
                        utilisateurId: utilisateur._id,
                        isAdmin: utilisateur.isAdmin,
                        pseudo: utilisateur.pseudo,
                        token: jwt.sign( //on encode un nouveau token qui expire dans 24h. Après ce délai, le token ne sera plus valide et l'utilisateur devra se reconnecter
                            {utilisateurId: utilisateur._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )});
                })
                .catch(error => res.status(500).json({error}));
        })
}

module.exports = {signup, login};


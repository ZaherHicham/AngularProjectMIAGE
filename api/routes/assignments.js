let Assignment = require('../model/assignment');
// Récupérer tous les assignments (GET)
/*function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}*/
function getAssignments(req, res) {
    var aggregateQuery = Assignment.aggregate();
    Assignment.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, assignments) => {
            if (err) {
                res.send(err);
            }
            res.send(assignments);
        }
    );
}


// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;

    Assignment.findOne({ id: assignmentId })
        .then(assignment => {
            if (!assignment) {
                return res.status(404).json({ message: 'Aucune assignation trouvée avec cet ID.' });
            }
            res.json(assignment);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}


// Ajout d'un assignment (POST)
function postAssignment(req, res){
    console.log("in")
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    assignment.auteur = req.body.auteur;
    assignment.matiere = req.body.matiere;
    assignment.professeur = req.body.professeur;
    assignment.imageMatiere = req.body.imageMatiere;
    assignment.note = req.body.note;
    assignment.remarques = req.body.remarques;

    console.log("POST assignment reçu :");
    console.log(assignment)

    /*assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })*/

    assignment.save()
    .then(() => {
        res.json({ message: `${assignment.nom} saved!` });
    })
    .catch(err => {
        res.status(500).json({ error: `Impossible de sauvegarder l'assignation: ${err}` });
    });

}

// Update d'un assignment (PUT)
/*function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}*/
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);

    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(assignment => {
            if (!assignment) {
                return res.status(404).json({ message: 'Aucune assignation trouvée avec cet ID.' });
            }
            res.json({ message: 'Mise à jour réussie' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
}


// suppression d'un assignment (DELETE)
/*function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}*/
function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id)
        .then(assignment => {
            if (!assignment) {
                return res.status(404).json({ message: 'Assignment not found' });
            }
            res.json({ message: `${assignment.nom} deleted` });
        })
        .catch(err => {
            res.status(500).json({ error: `Unable to delete assignment: ${err}` });
        });
}




module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };

const router = require('express').Router();
const { Student, Campus } = require('../db/models');

// reminder that all of these routes start with api/students
router.get('/', (req,res,next) => {
  Student.findAll({
    include: [ Campus ],
    order: [[ 'lastName', 'ASC' ]]
  })
    .then(students => res.send(students))
    .catch(next)
});

router.post('/', (req,res,next)=>{
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next)
});

router.put('/:id', (req,res,next) => {
  console.log(req.body)
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(next)
});

router.delete('/:id', (req,res,next)=>{
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
});

module.exports = router;
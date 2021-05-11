var express = require('express');
var router = express.Router();


let candidatesData =  require('./candidates.json');

/* GET candidates listing. */
router.get('/', function(req, res, next) {
    if(req.query){
        if(req.query.ethnicity){
            let candidateByEthnicity = candidatesData.filter(c => c.ethnicity === req.query.ethnicity);
            if(req.query.company){
                let candidateByEthnicityAndCompany =  candidateByEthnicity.filter(c => c.company === req.query.company);
                res.json(candidateByEthnicityAndCompany);
            } else {
                res.json(candidateByEthnicity);
            }
        } else {
            if(req.query.company){
                let candidateByCompany =  candidatesData.filter(c => c.company === req.query.company);
                res.json(candidateByCompany);
            } else {
                res.json(candidatesData)
            }
        }

    } else {
        res.json(candidatesData)
    }

});


router.get('/register', function(req, res, next) {
    res.send('<h1>Register</h1>')
});

// register post methods

router.post('/register', function(req, res, next) {
    console.log(req);
    res.send('<h1>Register POST method</h1>')
});



router.get('/:id', function(req, res, next) {
    idx = candidatesData.findIndex(c => c.id === parseInt(req.params.id));
    let candidate = candidatesData[idx]
    if(candidate){
        res.json(candidate)
    
    } else {
        res.send("<h1>Not found the candidate </h1>")
    }
});



// DESTROY candidates endpoint for one candidate.
router.delete("/:id", (req, res, next) => {
    res.send(`DELETE Request Called`);    
})


// PATH/PUT candidates listening 
router.put("/:id", (req, res) => {
    res.send(`Got a PUT request from / userId ${req.params.id} `)
})



router.get('/:id/edit', function(req, res, next) {
    idx = candidatesData.findIndex(c => c.id === parseInt(req.params.id));
    let candidate = candidatesData[idx]
    if(candidate){
        res.json(candidate)
    
    } else {
        res.send("<h1>Not found the candidate </h1>")
    }
});

// PATH/PUT candidates listening 
router.put("/:id/edit", (req, res) => {
    res.send(`Got a PUT request from / userId ${req.params.id} `)
})




module.exports = router;

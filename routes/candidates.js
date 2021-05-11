var express = require('express');
var router = express.Router();
var fs = require('fs');

fs.readFile(`${__dirname}/candidates.json`, 'utf8', (err , data) => {
    if (err) throw err;
    candidatesData =  JSON.parse(data)

})

function save(data){
    const json = JSON.stringify(data);
    fs.writeFile("./routes/candidates.json", json, function(err, data) {
        if(err) return console.log(err)
    })
}



/* GET candidates listing. */
router.get('/', function(req, res, next) {
    // if(req.query){
    //     if(req.query.ethnicity){
    //         let candidateByEthnicity = candidatesData.filter(c => c.ethnicity === req.query.ethnicity);
    //         if(req.query.company){
    //             let candidateByEthnicityAndCompany =  candidateByEthnicity.filter(c => c.company === req.query.company);
    //             res.json(candidateByEthnicityAndCompany);
    //         } else {
    //             res.json(candidateByEthnicity);
    //         }
    //     } else {
    //         if(req.query.company){
    //             let candidateByCompany =  candidatesData.filter(c => c.company === req.query.company);
    //             res.json(candidateByCompany);
    //         } else {
    //             res.json(candidatesData)
    //         }
    //     }

    // } else {
    //     res.json(candidatesData)
    // }
    let candidates = candidatesData;
    const queryStringFilter = Object.keys(req.query);
    console.log({queryStringFilter})
    if(queryStringFilter.length !== 0 ){
        queryStringFilter.map(filter => {
            candidates = candidates.filter(candidate => candidate[filter] === req.query[filter])
        })
    };
    
    res.json(candidates);
});


router.get('/register', function(req, res, next) {
    res.send('<h1>Register</h1>')
});

// register post methods

router.post('/', function(req, res) {
   let candidates = candidatesData;
    const candidate = req.body;
    candidate.id = candidates.length + 1;
    candidates.push(candidate);
    save(candidates); 
    res.send(candidate);
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

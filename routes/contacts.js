/**
 * Created by adityamangipudi1 on 4/22/15.
 */
var router  =require('express').Router()
var ContactModel = require('../models/contacts_model')

router.get('/', function (req, res){

    var obj;
    if(req.query.email){
       obj= {email:req.query.email}
    }else{
        obj={}
    }

    ContactModel.find(obj,function(err, result){
        if(err) res.status(500).json(err)
        else res.status(200).json(result)
    });
});




router.post('/', function (req, res){


    (new ContactModel(req.body)).save(function(err, result){
        console.log(result);
        if(err) res.status(500).json(err)
        else res.status(200).json(result)
    });
});




router.put('/', function (req, res){



     ContactModel.update({_id: req.query._id},
         req.body
         ,function(err, result){
        if(err) res.status(500).json(err)
        else res.status(200).json(result)
    });


})




router.delete('/:_id', function (req, res){


    ContactModel.remove({_id: req.params._id||req.query._id},function(err, result){
        if(err) res.status(500).json(err)
        else res.status(200).json(result)
    });
})

module.exports = router;
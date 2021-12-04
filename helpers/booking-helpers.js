var db=require('../config/connection')             
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID   

module.exports={                                         
    
    addBooking:(booking, callback)=>{
        //console.log(product)
        db.get().collection('booking').insertOne(booking).then((data)=>{       
            //console.log(data.ops[0])
            callback(data.ops[0]._id)           
        })
    },
}
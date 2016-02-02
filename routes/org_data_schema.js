var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
        gitUserName: {
          type: String,
          required:true
        },
        repo: {
          type: String,
          required: true,
          lowercase: true
        },
        commitId: {
          type: Number,
          required:true,
          default: 0
        },
        author:{
              name:{
                type:String,
              },
              email:{
                type:String,
                match : /.+@.+\..+/
              },
              date:{
                type:Date
              }
        },
        commiter:{
              name:{
                type:String,
              },
              email:{
                type:String,
                match : /.+@.+\..+/
              }
        },
        commitDate:{
            type:Date,
            required:true
        },
        reviewer:{
              name:{
                type:String,
              },
              email:{
                type:String,
                match : /.+@.+\..+/
              },
              date:{
                type:Date
              }
        },
        gitRepoId:{
            type:Number,
            required:true
        },
        noOfFiles:{
          type:Number
        },
        insertion:{
          type:Number
        },
        deletion:{
          type:Number
        }

});

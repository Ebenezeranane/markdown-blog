
const marked = require('marked');
const slugify = require('slugify');
const createDomPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurifier(new JSDOM().window)
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    
    },
    description:{
        type:String,
        required:true,
        
    },
    markdown:{
        type:String,
        required:true,
       
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },

    slug:{
        type: String,
        required: true,
        unique: true
    },

    sanitizedHtml: {
        type: String,
        required: true

    }
});

  articleSchema.pre('validate',function(next){
      if(this.title){
          this.slug = slugify(this.title,{
              lower:true,strict:true
          })

       if(this.markdown){
           this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
       }   
      }
      next()
  })

//Export the model
module.exports = mongoose.model('Article', articleSchema);
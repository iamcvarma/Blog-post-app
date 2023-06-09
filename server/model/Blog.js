import mongoose  from "mongoose"; 

const BlogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title:{
    type:String,
    required:true,
  },
  content: {
    type: String,
    required: true,
  },
  upvotes:{
    type:Number,
    default:0
  },
  
},{ timestamps: true });

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
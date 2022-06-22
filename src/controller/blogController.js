const BlogModel = require('../Model/blogModel')
const AuthorModel=require('../Model/authorModel')

exports.createBlog = async function(req,res){
    try{
        let authorId=req.body.author_Id
        let id=await AuthorModel.find({_id: authorId}).select({_Id:1})
        let blog=id.map((obj)=>obj._id.toString())
        if (authorId==blog){
        let data = req.body
        let saveData = await BlogModel.create(data)
        res.status(201).send({
            status : true,
            msg : saveData
        
        })}

        else{res.status(400).send({ status: false, msg: "Autho_id is Invalid"})}
    } catch(err){
        res.status(400).send(err.message)
    }
}

exports.blogs = async function (req, res) {
    try {
      const data = req.query;
      const foundPost = await BlogModel.find({
        isPublished: true,
        isDeleted: false,
      }).find(data);
      if (foundPost.length == 0) {
        res.status(400).send("Postt not found");
      } else {
        res.status(200).send({ status: true, msg: foundPost });
      }
    } catch (error) {
      res.status(400).send(err.message);
    }
  };
  exports.updateblog = async function (req, res) {
    try {
        let data = req.body;
        let blogId = req.params.blogId;

        const { title, body, tags, subcategory } = data;

        let blog = await BlogModel.findById(blogId);

        let updatedblog = await BlogModel.find({isDeleted:false}).findOneAndUpdate({ _id: blogId }, { $addToSet: { tags: tags, subcategory: subcategory }, $set: { title: title, body: body, publishedAt: Date.now(),isPublished : true } }, { new: true });

        res.status(201).send({status: true, msg: "done", data: updatedblog });
    }
    catch (err) {
        res.status(500).send({status: false, msg: "Error", error: err.message })
    }
}
  exports.deleteBlog = async function(req,res){
    try{
    let blogId= req.params.blogId
    let data = await BlogModel.find({isDeleted:false}).findOneAndUpdate({_id :blogId},{$set:{isDeleted:true}})
    if(data==null || data == undefined) {
        res.status(404).send({status:false,msg:" "})
    }else{
        res.status(200).send()
    }
}
catch (err){
    res.status(404).send(err.message)
}
}

exports.deleteBlogByQuery = async function(req,res){
    try{
    let blogId= req.query
    let data = await BlogModel.find({isDeleted:false}).findOneAndUpdate(blogId,{$set:{isDeleted:true}})
    if(data==null || data == undefined) {
        res.status(404).send({status:false,msg:" "})
    }else{
        res.status(200).send()
    }
}
catch (err){
    res.status(404).send(err.message)
}
} 
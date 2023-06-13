const express=require('express');
const { JobModel } = require('../model/job.model');
const jobRoute=express.Router()


jobRoute.post('/add',async(req,res)=>{
    try {
        const job=new JobModel(req.body)
        await job.save()
        res.status(200).send({"msg":"New job has been added"})
    } catch (error) {
        res.status(400).send({"err":error})
    }
    })
    jobRoute.get('/',async(req,res)=>{
        try{
          const {role,sort,search,page,limit}=req.query;
          const query={};
          if(role){
            query.role=role;
          }
          const sortOptions={};
          if (sort==='desc') {
            sortOptions.postedAt=-1;
          }else if(sort==='asc') {
            sortOptions.postedAt=1;
          }
          if (search) {
            query.language={$regex:new RegExp(search,'i')};
          }
          const pageNumber=parseInt(page)||1;
          const pageSize=parseInt(limit)||10;
          const skip=(pageNumber-1)*pageSize;
          const jobs=await JobModel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);
      
          res.send(jobs);
        } catch(error){
          console.error(error);
          res.status(500).json({error:'Internal Server Error'});
        }
      });
  module.exports={jobRoute}
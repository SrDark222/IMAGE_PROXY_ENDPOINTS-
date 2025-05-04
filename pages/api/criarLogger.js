import fs from 'fs'
import path from 'path'
export default async function handler(req,res){
  const {image,webhook}=req.body
  const id=Date.now().toString()
  const filePath=path.join(process.cwd(),"data.json")
  const data=fs.existsSync(filePath)?JSON.parse(fs.readFileSync(filePath)):{}
  data[id]={image,webhook,createdAt:new Date()}
  fs.writeFileSync(filePath,JSON.stringify(data))
  res.json({id})
}

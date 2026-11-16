import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { api, jsonBody } from '../lib/api';

export default function GalleryManager() {
  const [album,setAlbum]=useState('plants');
  const [items,setItems]=useState([]);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState(null);
  const load=useCallback(async()=>{
    const result=await api(`/admin/gallery?album=${album}`);
    setItems(result.images||[]);
  },[album]);
  useEffect(()=>{load().catch(e=>setMessage({type:'danger',text:e.message}));},[load]);
  function edit(id,field,value){setItems(old=>old.map(i=>i.asset_id===id?{...i,[field]:value}:i));}
  async function act(action,success){
    setBusy(true);setMessage(null);
    try{await action();await load();setMessage({type:'success',text:success});}
    catch(e){setMessage({type:'danger',text:e.message});}
    finally{setBusy(false);}
  }
  return <div className="dgc-account-panel">
    <h2>Photo management</h2>
    <p className="text-muted">Manage existing Cloudinary photos without re-uploading. Changes to titles, descriptions and visibility are saved in Neon.</p>
    {message&&<Alert variant={message.type} onClose={()=>setMessage(null)} dismissible>{message.text}</Alert>}
    <div className="d-flex gap-2 flex-wrap mb-3">
      <Form.Select style={{maxWidth:210}} value={album} onChange={e=>setAlbum(e.target.value)} aria-label="Photo album">
        <option value="plants">Plants</option><option value="events">Events</option>
      </Form.Select>
      <Button variant="outline-success" disabled={busy} onClick={()=>act(()=>api('/admin/gallery/sync',{method:'POST'}),'Cloudinary photos synchronized; your edits were preserved.')}>Sync from Cloudinary</Button>
      <Badge bg="secondary" className="align-self-center">{items.length} photos</Badge>
    </div>
    <Row className="g-3">
      {items.map(item=><Col md={6} xl={4} key={item.asset_id}>
        <div className="border rounded p-3 h-100 bg-white text-dark">
          <a href={item.secure_url} target="_blank" rel="noreferrer"><img src={item.secure_url} alt={item.title||'Garden club photo'} loading="lazy" style={{width:'100%',aspectRatio:'4 / 3',objectFit:'cover',borderRadius:8}}/></a>
          <div className="small text-muted text-break my-2">{item.original_filename||item.public_id}</div>
          <Form.Group className="mb-2"><Form.Label>Title</Form.Label><Form.Control maxLength={160} value={item.title||''} onChange={e=>edit(item.asset_id,'title',e.target.value)}/></Form.Group>
          <Form.Group className="mb-2"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={2} maxLength={1000} value={item.description||''} onChange={e=>edit(item.asset_id,'description',e.target.value)}/></Form.Group>
          <Form.Check className="mb-3" type="switch" checked={!item.hidden} label="Visible in Gallery" onChange={e=>edit(item.asset_id,'hidden',!e.target.checked)}/>
          <div className="d-flex gap-2 flex-wrap">
            <Button size="sm" disabled={busy} onClick={()=>act(()=>api(`/admin/gallery/${encodeURIComponent(item.asset_id)}`,{method:'PATCH',body:jsonBody({title:item.title||'',description:item.description||'',hidden:!!item.hidden})}),'Photo details saved.')}>Save</Button>
            <Button size="sm" variant="outline-danger" disabled={busy} onClick={()=>{
              if(window.confirm(`Permanently delete ${item.public_id} from Cloudinary? This cannot be undone.`)) act(()=>api(`/admin/gallery/${encodeURIComponent(item.asset_id)}`,{method:'DELETE'}),'Photo deleted from Cloudinary.');
            }}>Delete permanently</Button>
          </div>
        </div>
      </Col>)}
    </Row>
    {items.length===0&&<p className="text-muted">No photos imported yet. Select Sync from Cloudinary.</p>}
  </div>;
}

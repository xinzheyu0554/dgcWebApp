import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Badge, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { api, jsonBody } from '../lib/api';

export default function GalleryManager() {
  const [album, setAlbum] = useState('plants');
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncCount, setSyncCount] = useState(0);
  const [message, setMessage] = useState(null);
  const requestId = useRef(0);

  const load = useCallback(async (showLoading = false) => {
    const id = ++requestId.current;
    if (showLoading) setLoading(true);
    try {
      const result = await api(`/admin/gallery?album=${album}`);
      if (id === requestId.current) setItems(result.images || []);
    } catch (e) {
      if (id === requestId.current) setMessage({ type:'danger', text:e.message });
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [album]);

  useEffect(() => {
    setItems([]);
    setMessage(null);
    load(true);
    return () => { requestId.current += 1; };
  }, [load]);

  const edit = (id, field, value) => setItems(old => old.map(i =>
    i.asset_id === id ? { ...i, [field]: value } : i));

  async function act(action, success) {
    setBusy(true);
    setMessage(null);
    try {
      await action();
      await load();
      setMessage({ type:'success', text:success });
    } catch (e) {
      setMessage({ type:'danger', text:e.message });
    } finally {
      setBusy(false);
    }
  }

  async function syncAll() {
    setSyncing(true);
    setSyncCount(0);
    setMessage(null);
    // Freeze editing while all pages finish; never show partially updated cards.
    setLoading(true);
    let count = 0;
    let failed = false;
    try {
      for (const targetAlbum of ['plants', 'events']) {
        let cursor = null;
        let pages = 0;
        do {
          const result = await api('/admin/gallery/sync', {
            method: 'POST',
            body: jsonBody({ album: targetAlbum, cursor }),
          });
          count += Number(result.imported || 0);
          setSyncCount(count);
          cursor = result.next_cursor || null;
          pages++;
          if (pages > 1000) throw new Error('Sync stopped: excessive pagination.');
        } while (cursor);
      }
      setMessage({ type:'success', text:`Cloudinary sync completed (${count} photos checked). Existing edits were preserved.` });
    } catch (e) {
      failed = true;
      setMessage({ type:'danger', text:`Sync interrupted: ${e.message}. Photos already imported are safe. You can retry.` });
    } finally {
      await load();
      setSyncing(false);
      setLoading(false);
      if (failed) console.warn('Gallery sync incomplete; previously imported photos remain editable.');
    }
  }

  const locked = loading || syncing || busy;
  return <div className="dgc-account-panel">
    <h2>Photo management</h2>
    <p className="text-muted">Edit Cloudinary photos without re-uploading. Titles, descriptions and visibility are saved in Neon.</p>
    {message && <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>{message.text}</Alert>}
    <div className="d-flex gap-2 flex-wrap mb-3">
      <Form.Select style={{ maxWidth:210 }} value={album} disabled={syncing} onChange={e => setAlbum(e.target.value)} aria-label="Photo album">
        <option value="plants">Plants</option><option value="events">Events</option>
      </Form.Select>
      <Button variant="outline-success" disabled={locked} onClick={syncAll}>
        {syncing ? 'Syncing…' : 'Sync from Cloudinary'}
      </Button>
      {!loading && <Badge bg="secondary" className="align-self-center">{items.length} photos</Badge>}
    </div>
    {loading ? <div role="status" className="text-center py-5">
      <Spinner animation="border" variant="success" />
      <p className="mt-3 text-muted">{syncing ? `Syncing Cloudinary photos… ${syncCount} checked` : 'Loading photo details…'}</p>
    </div> : <>
      <Row className="g-3">
        {items.map(item => <Col md={6} xl={4} key={item.asset_id}>
          <div className="border rounded p-3 h-100 bg-white text-dark">
            <a href={item.secure_url} target="_blank" rel="noreferrer"><img src={item.secure_url} alt={item.title || 'Garden club photo'} loading="lazy" style={{ width:'100%', aspectRatio:'4 / 3', objectFit:'cover', borderRadius:8 }} /></a>
            <div className="small text-muted text-break my-2">{item.original_filename || item.public_id}</div>
            <Form.Group className="mb-2"><Form.Label>Title</Form.Label><Form.Control disabled={locked} maxLength={160} value={item.title || ''} onChange={e => edit(item.asset_id, 'title', e.target.value)} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Description</Form.Label><Form.Control disabled={locked} as="textarea" rows={2} maxLength={1000} value={item.description || ''} onChange={e => edit(item.asset_id, 'description', e.target.value)} /></Form.Group>
            <Form.Check className="mb-3" type="switch" disabled={locked} checked={!item.hidden} label="Visible in Gallery" onChange={e => edit(item.asset_id, 'hidden', !e.target.checked)} />
            <div className="d-flex gap-2 flex-wrap">
              <Button size="sm" disabled={locked} onClick={() => act(() => api(`/admin/gallery/${encodeURIComponent(item.asset_id)}`, {method:'PATCH',body:jsonBody({title:item.title || '',description:item.description || '',hidden:!!item.hidden})}), 'Photo details saved.')}>Save</Button>
              <Button size="sm" variant="outline-danger" disabled={locked} onClick={() => {
                if(window.confirm(`Permanently delete ${item.public_id} from Cloudinary? This cannot be undone.`)) act(() => api(`/admin/gallery/${encodeURIComponent(item.asset_id)}`, {method:'DELETE'}), 'Photo deleted from Cloudinary.');
              }}>Delete permanently</Button>
            </div>
          </div>
        </Col>)}
      </Row>
      {items.length === 0 && <p className="text-muted">No photos imported yet. Select Sync from Cloudinary.</p>}
    </>}
  </div>;
}

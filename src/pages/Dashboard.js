import React, { useCallback, useEffect, useState } from "react";
import { Alert, Badge, Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { api, jsonBody } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import "../styles/dgc-dashboard.css";
import GalleryManager from "../components/GalleryManager";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const emptyNewUser = { email: "", full_name: "", password: "", role: "member" };

export default function Dashboard() {
  const { user, loading, refresh } = useAuth();
  const [tab, setTab] = useState("account");
  const [alert, setAlert] = useState(null);
  const [busy, setBusy] = useState(false);
  const [newsletters, setNewsletters] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(emptyNewUser);
  const [resetPassword, setResetPassword] = useState({});
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [upload, setUpload] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1, title: "" });
  const [pdf, setPdf] = useState(null);

  const admin = user?.role === "admin";
  const notify = useCallback((message, variant = "success") => { setAlert({ message, variant }); }, []);
  const loadNewsletters = useCallback(async () => {
    const data = await api("/newsletters"); setNewsletters(data.newsletters || []);
  }, []);
  const loadUsers = useCallback(async () => {
    const data = await api("/admin/users"); setUsers(data.users || []);
  }, []);

  useEffect(() => {
    if (user) {
      loadNewsletters().catch(e => notify(e.message, "danger"));
      if (admin) loadUsers().catch(e => notify(e.message, "danger"));
    }
  }, [user, admin, loadNewsletters, loadUsers, notify]);

  if (loading) return <div className="dgc-loading">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;

  async function execute(action, success) {
    setBusy(true); setAlert(null);
    try { await action(); if (success) notify(success); }
    catch (e) { notify(e.message, "danger"); }
    finally { setBusy(false); }
  }

  async function changePassword(e) {
    e.preventDefault();
    await execute(async () => {
      await api("/auth/change-password", { method: "POST", body: jsonBody(passwords) });
      setPasswords({ currentPassword: "", newPassword: "" });
    }, "Password updated. Other sessions have been signed out.");
  }
  async function addUser(e) {
    e.preventDefault();
    await execute(async () => {
      await api("/admin/users", { method: "POST", body: jsonBody(newUser) });
      setNewUser(emptyNewUser); await loadUsers();
    }, "Account created. Share the temporary password with the user securely.");
  }
  async function saveUser(person) {
    await execute(async () => {
      await api(`/admin/users/${person.id}`, {
        method: "PATCH",
        body: jsonBody({ full_name: person.full_name, role: person.role, active: person.active, password: resetPassword[person.id] || undefined }),
      });
      setResetPassword(s => ({ ...s, [person.id]: "" })); await loadUsers(); await refresh();
    }, "Account updated.");
  }
  async function deactivateUser(person) {
    if (!window.confirm(`Deactivate ${person.email}? They will no longer be able to sign in.`)) return;
    await execute(async () => {
      await api(`/admin/users/${person.id}`, { method: "DELETE" }); await loadUsers();
    }, "Account deactivated.");
  }
  async function uploadPdf(e) {
    e.preventDefault();
    if (!pdf) return notify("Select a PDF file first.", "danger");
    if (pdf.size > 3 * 1024 * 1024) return notify("PDFs must be 3 MB or smaller.", "danger");
    await execute(async () => {
      const search = new URLSearchParams({
        year: String(upload.year), month: String(upload.month),
        title: upload.title, filename: pdf.name,
      });
      await api(`/admin/newsletters?${search}`, {
        method: "POST", body: pdf,
        headers: { "Content-Type": "application/pdf" },
      });
      setPdf(null); setUpload(s => ({ ...s, title: "" }));
      const input = document.getElementById("dgc-newsletter-file");
      if (input) input.value = "";
      await loadNewsletters();
    }, "PDF committed to GitHub main. It will be available once Netlify finishes deploying.");
  }
  async function replaceNewsletter(item, file) {
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) return notify("PDFs must be 3 MB or smaller.", "danger");
    if (!window.confirm(`Replace the PDF for ${item.title}? The existing URL stays the same.`)) return;
    await execute(async () => {
      await api(`/admin/newsletters/${item.id}/replace`, {
        method: "POST", body: file, headers: { "Content-Type": "application/pdf" },
      });
      await loadNewsletters();
    }, "Replacement committed to GitHub main. It will appear after Netlify finishes deploying.");
  }
  async function removeNewsletter(item) {
    if (!window.confirm(`Permanently delete ${item.title} from the GitHub repository? This cannot be undone from the Dashboard.`)) return;
    await execute(async () => {
      await api(`/admin/newsletters/${item.id}`, { method: "DELETE" });
      await loadNewsletters();
    }, "Deletion committed to GitHub main. The live PDF may remain accessible until Netlify deploys.");
  }
  function updateUser(id, key, value) {
    setUsers(current => current.map(person => person.id === id ? { ...person, [key]: value } : person));
  }

  return (
    <div className="dgc-page">
      <section className="dgc-simple-hero"><Container><div className="dgc-simple-hero__inner">
        <span className="dgc-badge">Members area</span><h1>Dashboard</h1>
        <p>Welcome, {user.full_name}.</p>
      </div></Container></section>
      <section className="dgc-section"><Container>
        <div className="dgc-dashboard-layout">
          <div className="dgc-dashboard-tabs" role="tablist" aria-label="Dashboard navigation">
            <Button variant={tab === "account" ? "success" : "outline-secondary"} onClick={() => { setTab("account"); setAlert(null); }}>My account</Button>
            {admin && <Button variant={tab === "newsletters" ? "success" : "outline-secondary"} onClick={() => { setTab("newsletters"); setAlert(null); }}>Newsletter management</Button>}
            {admin && <Button variant={tab === "gallery" ? "success" : "outline-secondary"} onClick={() => { setTab("gallery"); setAlert(null); }}>Photo management</Button>}
            {admin && <Button variant={tab === "users" ? "success" : "outline-secondary"} onClick={() => { setTab("users"); setAlert(null); }}>Account management</Button>}
          </div>
          {alert && <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>{alert.message}</Alert>}
          {admin && tab === "gallery" && <GalleryManager />}
          {tab === "account" && <div className="dgc-account-panel">
            <h2>My account</h2>
            <p><strong>Name:</strong> {user.full_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> <Badge bg={admin ? "success" : "secondary"}>{admin ? "Administrator" : "Member"}</Badge></p>
            <hr /><h3>Change password</h3>
            <Form onSubmit={changePassword} className="dgc-dashboard-form">
              <Form.Group><Form.Label>Current password</Form.Label><Form.Control type="password" required autoComplete="current-password" value={passwords.currentPassword} onChange={e => setPasswords(s => ({ ...s, currentPassword: e.target.value }))} /></Form.Group>
              <Form.Group><Form.Label>New password (12+ characters)</Form.Label><Form.Control type="password" required minLength={12} autoComplete="new-password" value={passwords.newPassword} onChange={e => setPasswords(s => ({ ...s, newPassword: e.target.value }))} /></Form.Group>
              <Button type="submit" disabled={busy}>Update password</Button>
            </Form>
          </div>}
          {admin && tab === "newsletters" && <div className="dgc-account-panel">
            <h2>Newsletter management</h2>
            <p className="text-muted">Choose a year folder to upload a new PDF. Existing newsletters, including historical files, can be replaced or deleted below. Changes are committed to GitHub and published after the next Netlify deployment.</p>
            <Form onSubmit={uploadPdf} className="dgc-dashboard-form dgc-dashboard-upload">
              <Row><Col sm={4}><Form.Group><Form.Label>Year folder</Form.Label><Form.Select required value={upload.year} onChange={e => setUpload(s => ({ ...s, year: Number(e.target.value) }))}>{Array.from({ length: new Date().getFullYear() + 2 - 2020 + 1 }, (_, i) => new Date().getFullYear() + 2 - i).map(year => <option key={year} value={year}>{year}</option>)}</Form.Select></Form.Group></Col>
              <Col sm={8}><Form.Group><Form.Label>Month</Form.Label><Form.Select value={upload.month} onChange={e => setUpload(s => ({ ...s, month: Number(e.target.value) }))}>{months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}</Form.Select></Form.Group></Col></Row>
              <Form.Group><Form.Label>Title</Form.Label><Form.Control required maxLength={180} placeholder="DGC Newsletter December 2026" value={upload.title} onChange={e => setUpload(s => ({ ...s, title: e.target.value }))} /></Form.Group>
              <Form.Group><Form.Label>PDF (maximum 3 MB)</Form.Label><Form.Control id="dgc-newsletter-file" type="file" accept=".pdf,application/pdf" required onChange={e => setPdf(e.target.files?.[0] || null)} /></Form.Group>
              <Button type="submit" disabled={busy}>{busy ? "Processing…" : "Upload and publish"}</Button>
            </Form>
            <h3 className="mt-4">Manage all newsletters</h3>
            {newsletters.length === 0 ? <p>No newsletters found.</p> : (
              <div className="table-responsive"><Table striped hover className="dgc-dashboard-table"><thead><tr><th>Month</th><th>Title</th><th>PDF</th><th>Action</th></tr></thead><tbody>
                {newsletters.map(item => <tr key={item.id}>
                  <td>{months[item.month - 1]} {item.year}</td><td>{item.title}</td>
                  <td><a href={item.url} target="_blank" rel="noreferrer">View</a></td>
                  <td>
                    <div className="dgc-dashboard-actions">
                      <Form.Label className="btn btn-sm btn-outline-primary mb-0" style={{cursor: busy ? "not-allowed" : "pointer"}}>
                        Replace PDF
                        <Form.Control type="file" accept=".pdf,application/pdf" className="visually-hidden" disabled={busy}
                          onChange={e => { const file = e.target.files?.[0]; e.target.value = ""; if (file) replaceNewsletter(item, file); }} />
                      </Form.Label>
                      <Button size="sm" variant="outline-danger" disabled={busy} onClick={() => removeNewsletter(item)}>Delete</Button>
                    </div>
                  </td>
                </tr>)}
              </tbody></Table></div>
            )}
            <p className="text-muted small">All changes are GitHub commits on main. Replacing a PDF preserves its original link. Deleting removes it from the live list and from GitHub after deployment. Git history can be used to recover an accidental deletion. Pull main before your next local change.</p>
          </div>}
          {admin && tab === "users" && <div className="dgc-account-panel">
            <h2>Account management</h2>
            <h3>Create account</h3>
            <Form onSubmit={addUser} className="dgc-dashboard-form dgc-dashboard-upload">
              <Row><Col md={6}><Form.Group><Form.Label>Full name</Form.Label><Form.Control required maxLength={100} value={newUser.full_name} onChange={e => setNewUser(s => ({ ...s, full_name: e.target.value }))} /></Form.Group></Col><Col md={6}><Form.Group><Form.Label>Email</Form.Label><Form.Control type="email" required value={newUser.email} onChange={e => setNewUser(s => ({ ...s, email: e.target.value }))} /></Form.Group></Col></Row>
              <Form.Group><Form.Label>Initial password (12+ characters)</Form.Label><Form.Control type="password" minLength={12} required autoComplete="new-password" value={newUser.password} onChange={e => setNewUser(s => ({ ...s, password: e.target.value }))} /></Form.Group>
              <Form.Group><Form.Label>Role</Form.Label><Form.Select value={newUser.role} onChange={e => setNewUser(s => ({ ...s, role: e.target.value }))}><option value="member">Member</option><option value="admin">Admin</option></Form.Select></Form.Group>
              <Button type="submit" disabled={busy}>Create account</Button>
            </Form>
            <h3 className="mt-4">Existing accounts</h3>
            <div className="table-responsive"><Table striped className="dgc-dashboard-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Active</th><th>New password (optional)</th><th>Actions</th></tr></thead><tbody>
              {users.map(person => <tr key={person.id}>
                <td><Form.Control size="sm" aria-label={`Name ${person.email}`} value={person.full_name} onChange={e => updateUser(person.id, "full_name", e.target.value)} /></td>
                <td>{person.email}</td>
                <td><Form.Select size="sm" disabled={person.id === user.id} value={person.role} onChange={e => updateUser(person.id, "role", e.target.value)}><option value="member">Member</option><option value="admin">Admin</option></Form.Select></td>
                <td><Form.Check aria-label={`Active ${person.email}`} checked={person.active} disabled={person.id === user.id} onChange={e => updateUser(person.id, "active", e.target.checked)} /></td>
                <td><Form.Control size="sm" type="password" autoComplete="new-password" placeholder="Leave unchanged" value={resetPassword[person.id] || ""} onChange={e => setResetPassword(s => ({ ...s, [person.id]: e.target.value }))} /></td>
                <td><div className="dgc-dashboard-actions"><Button size="sm" disabled={busy} onClick={() => saveUser(person)}>Save</Button><Button size="sm" variant="outline-danger" disabled={busy || person.id === user.id || !person.active} onClick={() => deactivateUser(person)}>Deactivate</Button></div></td>
              </tr>)}
            </tbody></Table></div>
          </div>}
        </div>
      </Container></section>
    </div>
  );
}

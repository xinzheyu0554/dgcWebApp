import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dgc-dashboard.css";

export default function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (loading) return <div className="dgc-loading">Loading…</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  async function submit(e) {
    e.preventDefault();
    setError(""); setBusy(true);
    try { await login(email, password); navigate("/dashboard", { replace: true }); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  return (
    <div className="dgc-page">
      <section className="dgc-simple-hero"><Container><div className="dgc-simple-hero__inner">
        <span className="dgc-badge">Members</span><h1>Sign in</h1>
        <p>Access your Doncaster Garden Club account.</p>
      </div></Container></section>
      <section className="dgc-section"><Container><Row className="justify-content-center"><Col md={7} lg={5}>
        <Card className="dgc-account-card"><Card.Body>
          <h2 className="h4 mb-4">Account login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3"><Form.Label>Email</Form.Label>
              <Form.Control type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-4"><Form.Label>Password</Form.Label>
              <Form.Control type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
          </Form>
          <p className="text-muted small mt-3 mb-0">Accounts are managed by the club administrator.</p>
        </Card.Body></Card>
      </Col></Row></Container></section>
    </div>
  );
}

// components/Header.js
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">Meu App</Link>
      </div>
      
      <nav className="nav">
        <Link href="/">Home</Link>
        {session && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Perfil</Link>
            {session.user.role === 'admin' && (
              <Link href="/admin">Admin</Link>
            )}
          </>
        )}
      </nav>

      <div className="auth-section">
        {session ? (
          <div className="user-info">
            <span>Olá, {session.user.name}</span>
            <button onClick={() => signOut()} className="logout-btn">
              Sair
            </button>
          </div>
        ) : (
          <div className="login-options">
            <button onClick={() => signIn()} className="login-btn">
              Entrar
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
// pages/index.js
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="home-page">
      <h1>Bem-vindo ao Meu App!</h1>
      
      {session ? (
        <div className="welcome">
          <h2>Que bom te ver de novo, {session.user.name}! 👋</h2>
          <p>Você está logado como: <strong>{session.user.role}</strong></p>
          <div className="actions">
            <Link href="/dashboard" className="btn primary">
              Ir para Dashboard
            </Link>
            <Link href="/profile" className="btn secondary">
              Ver Perfil
            </Link>
          </div>
        </div>
      ) : (
        <div className="guest">
          <h2>Você não está logado</h2>
          <p>Faça login para acessar recursos exclusivos!</p>
          <div className="actions">
            <Link href="/auth/login" className="btn primary">
              Fazer Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
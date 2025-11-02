// pages/dashboard.js
import { useSession, getSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div className="loading">Carregando...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="cards">
        <div className="card">
          <h3>Informações do Usuário</h3>
          <p><strong>Nome:</strong> {session.user.name}</p>
          <p><strong>Email:</strong> {session.user.email}</p>
          <p><strong>Role:</strong> {session.user.role}</p>
        </div>
        
        <div className="card">
          <h3>Estatísticas</h3>
          <p>📊 15 tarefas completadas</p>
          <p>🎯 8 projetos ativos</p>
          <p>👥 3 colaboradores</p>
        </div>
        
        <div className="card">
          <h3>Ações Rápidas</h3>
          <button className="btn">Nova Tarefa</button>
          <button className="btn">Criar Projeto</button>
          <button className="btn">Relatório</button>
        </div>
      </div>
    </div>
  )
}

// 🔒 Proteção no servidor
export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
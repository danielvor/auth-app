// pages/admin.js
import { useSession, getSession } from 'next-auth/react'

export default function Admin() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Não autorizado</div>
  }

  // Verifica se é admin
  if (session.user.role !== 'admin') {
    return (
      <div className="error">
        <h1>Acesso Negado</h1>
        <p>Você precisa ser administrador para acessar esta página.</p>
      </div>
    )
  }

  return (
    <div className="admin">
      <h1>Painel Administrativo</h1>
      <p>Bem-vindo, Administrador!</p>
      
      <div className="admin-cards">
        <div className="card admin-card">
          <h3>Gerenciar Usuários</h3>
          <button className="btn">Ver Todos</button>
          <button className="btn">Criar Usuário</button>
        </div>
        
        <div className="card admin-card">
          <h3>Estatísticas do Sistema</h3>
          <p>👥 Total de usuários: 152</p>
          <p>📈 Logins hoje: 47</p>
          <p>🔒 Usuários ativos: 89</p>
        </div>
        
        <div className="card admin-card">
          <h3>Configurações</h3>
          <button className="btn">Backup</button>
          <button className="btn">Logs</button>
          <button className="btn">Manutenção</button>
        </div>
      </div>
    </div>
  )
}

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
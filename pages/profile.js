// pages/profile.js
import { useSession, getSession } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Não autorizado</div>
  }

  return (
    <div className="profile">
      <h1>Meu Perfil</h1>
      
      <div className="profile-card">
        <div className="avatar">
          {session.user.image ? (
            <img src={session.user.image} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="profile-info">
          <h2>{session.user.name}</h2>
          <p><strong>Email:</strong> {session.user.email}</p>
          <p><strong>Tipo de conta:</strong> {session.user.role}</p>
          <p><strong>Membro desde:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      <div className="profile-actions">
        <button className="btn">Editar Perfil</button>
        <button className="btn">Alterar Senha</button>
        <button className="btn">Configurações</button>
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
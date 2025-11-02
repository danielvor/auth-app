// pages/auth/login.js
import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      setError('Email ou senha inválidos!')
    } else {
      router.push('/dashboard')
    }
    
    setLoading(false)
  }

  const handleSocialLogin = (provider) => {
    signIn(provider)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Fazer Login</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleEmailLogin} className="login-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn primary full-width"
          >
            {loading ? 'Entrando...' : 'Entrar com Email'}
          </button>
        </form>

        <div className="divider">
          <span>ou</span>
        </div>

        <div className="social-login">
          <button 
            onClick={() => handleSocialLogin('google')}
            className="btn google-btn"
          >
            🌐 Entrar com Google
          </button>
        </div>

        <div className="demo-accounts">
          <h3>Contas de Demonstração:</h3>
          <p><strong>Admin:</strong> admin@teste.com / 123456</p>
          <p><strong>Usuário:</strong> usuario@teste.com / 123456</p>
        </div>
      </div>
    </div>
  )
}

// Se já estiver logado, redireciona
export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
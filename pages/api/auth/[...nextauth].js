// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// Usuários "fake" para demonstração
const users = [
  {
    id: '1',
    email: 'admin@teste.com',
    password: '123456',
    name: 'Administrador',
    role: 'admin'
  },
  {
    id: '2', 
    email: 'usuario@teste.com',
    password: '123456',
    name: 'João Silva',
    role: 'user'
  }
]

export default NextAuth({
  providers: [
    // 🔐 Login com Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo',
    }),
    
    // 📧 Login com Email/Senha
    CredentialsProvider({
      name: 'Email e Senha',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'seu@email.com' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        // Simulando busca no banco de dados
        const user = users.find(u => 
          u.email === credentials.email && 
          u.password === credentials.password
        )
        
        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        }
        return null
      }
    })
  ],
  
  // 🎨 Páginas customizadas
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  
  // ⚙️ Callbacks para personalizar
  callbacks: {
    async jwt({ token, user }) {
      // Adiciona role ao token
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Adiciona role à sessão
      session.user.role = token.role
      return session
    }
  },
  
  // 🔒 Configurações de sessão
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
})
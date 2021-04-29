function AuthPage() {
  return (
    <div>
      <a href="https://discord.com/api/oauth2/authorize?client_id=825310032945741824&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fprocess&response_type=code&scope=identify%20email%20connections%20guilds">Website</a>
    </div>
  );
}

export default AuthPage;

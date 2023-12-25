import "./loginpageStyles.css"

const LoginPage = () => {
  const login = (event: React.SyntheticEvent) => {
    // TODO IMPLEMENT LOGIN LOGIC
    event.preventDefault()
  }

  return (
    <>
      <div id='loginMaincontainer'>
        <h1 id='loginpageHeader'>Kirjaudu sisään</h1>
        <form onSubmit={login} id='loginForm'>
          <div>
            <input type='text' placeholder='Käyttäjätunnus' />
          </div>

          <div>
            <input type='password' placeholder='Salasana' />
          </div>

          <div>
            <input type='checkbox' /> Muista minut
          </div>

          <button type='submit'>Kirjaudu</button>
        </form>
      </div>
    </>
  )
}

export default LoginPage

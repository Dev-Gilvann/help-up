(() => {
  window.addEventListener('load', (e) => {
    const isLogged = localStorage.getItem('logged');
  
    if (isLogged !== 'true')
      window.location.href = '/tela-de-login/login.html';
    return null
  })
})()


function handleRegisterFormSubmit(event) {
  event.preventDefault();

  const nome = document.getElementById('register-nome').value;
  const email = document.getElementById('register-email').value;
  const senha = document.getElementById('register-password').value;
  const cpf = document.getElementById('register-cpf').value;
  const dataNascimento = document.getElementById('register-dataNascimento').value;

  const dados = {
    nome,
    email,
    senha,
    cpf,
    dataNascimento
  };
criarUsuario(dados)
  .then(res => {
    let mensagem = extrairMensagem(res.messages);
    if (res.status === 201) {
      mostrarAviso('Usuário criado com sucesso!', 'sucesso');
    } else {
      mostrarAviso(mensagem || 'Erro ao criar usuário.', 'erro');
    }
    console.log(res.messages);
  })
  .catch(err => {
    mostrarAviso('Erro ao criar usuário.', 'erro');
    console.error('Erro ao criar usuário:', err);
  });
}
function handleLoginFormSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-password').value;

  loginUsuario(email, senha)
    .then(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        mostrarAviso('Login realizado com sucesso!', 'sucesso');
        window.location.href = "index.html";
      } else {
        let mensagem = extrairMensagem(res.messages) || 'E-mail ou senha inválidos.';
        mostrarAviso(mensagem, 'erro');
      }
    })
    .catch(err => {
      mostrarAviso('Erro ao efetuar login.', 'erro');
      console.error('Erro ao efetuar login:', err);
    });
}
// Adiciona o event listener ao formulário de registro
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegisterFormSubmit);
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // ... já existente para registerForm ...
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginFormSubmit);
  }
});


// Criar novo usuário
function criarUsuario(dados) {
  return fetch('https://userbackend-nce0.onrender.com/user/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(async res => {
    const data = await res.json();
    // Inclui o status da resposta junto com o corpo
    return { status: res.status, ...data };
  });
}

// Login do usuário (retorna token)
function loginUsuario(email, senha) {
  return fetch('https://userbackend-nce0.onrender.com/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  }).then(res => res.json());
}

  document.getElementById('registerForm').addEventListener('submit', function (e) {
    const cpf = document.getElementById('register-cpf').value;
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!regex.test(cpf)) {
      alert('CPF inválido. Use o formato 000.000.000-00');
      e.preventDefault();
    }
  });


function mostrarAviso(mensagem, tipo) {
  const alertDiv = document.getElementById('register-alert');
  alertDiv.textContent = mensagem;
  alertDiv.className = 'register-alert ' + (tipo === 'sucesso' ? 'sucesso' : 'erro');
  alertDiv.style.display = 'block';
  setTimeout(() => {
    alertDiv.style.display = 'none';
  }, 4000);
}

function extrairMensagem(mensagem) {
  if (!mensagem) return '';
  if (typeof mensagem === 'string') return mensagem;
  if (Array.isArray(mensagem)) {
    // Se for array de objetos, pega só o campo message se existir
    return mensagem.map(item => {
      if (item && typeof item === 'object' && item.message) {
        return item.message;
      }
      return extrairMensagem(item);
    }).join(' | ');
  }
  if (typeof mensagem === 'object') {
    // Se for objeto com campo message, retorna só ele
    if (mensagem.message) return mensagem.message;
    // Se não, percorre os valores
    return Object.values(mensagem).map(extrairMensagem).join(' | ');
  }
  return String(mensagem);
}
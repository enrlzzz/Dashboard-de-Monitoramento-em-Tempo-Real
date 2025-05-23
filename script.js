
  const loginBtn = document.querySelector('#login-btn');
  const logoutBtn = document.querySelector('#logout-btn');
// Temperatura
new Chart(document.getElementById("tempChart"), {
  type: "line",
  data: {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [{
      label: "Temperatura (°C)",
      data: [20, 21, 26, 29, 25, 22],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "#f97316",
      borderWidth: 2
    }]
  },
  options: { responsive: true }
});

// Precipitação
new Chart(document.getElementById("rainChart"), {
  type: "bar",
  data: {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    datasets: [{
      label: "Chuva (mm)",
      data: [5, 12, 19, 7, 4, 15],
      backgroundColor: "#3b82f6"
    }]
  },
  options: { responsive: true }
});

// Umidade
new Chart(document.getElementById("humidityChart"), {
  type: "line",
  data: {
    labels: ["00h", "04h", "08h", "12h", "16h", "20h"],
    datasets: [{
      label: "Umidade (%)",
      data: [65, 70, 75, 60, 55, 63],
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "#0ea5e9",
      borderWidth: 2
    }]
  },
  options: { responsive: true }
});

// Vento
new Chart(document.getElementById("windChart"), {
  type: "line",
  data: {
    labels: ["00h", "04h", "08h", "12h", "16h", "20h"],
    datasets: [{
      label: "Vento (km/h)",
      data: [10, 12, 14, 15, 13, 11],
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      borderColor: "#10b981",
      borderWidth: 2
    }]
  },
  options: { responsive: true }
});

// Qualidade do Ar
new Chart(document.getElementById("airChart"), {
  type: "doughnut",
  data: {
    labels: ["Bom", "Moderado", "Insalubre"],
    datasets: [{
      data: [70, 20, 10],
      backgroundColor: ["#22c55e", "#facc15", "#ef4444"]
    }]
  },
  options: {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});


  function showForm(type) {
    const loginForm = document.getElementById('loginFormContainer');
    const registerForm = document.getElementById('registerFormContainer');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    if (type === 'login') {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
    } else {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
      loginTab.classList.remove('active');
      registerTab.classList.add('active');
    }
  }



document.addEventListener('DOMContentLoaded', function () {
  if (loginBtn) {
    loginBtn.addEventListener('click', function () {
      window.location.href = 'loginRegister.html';
    });
  }
});

function removeToken(){
       localStorage.removeItem("token");
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
}

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const response = await fetch("https://userbackend-nce0.onrender.com/user/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    });
    if (response.ok) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';

    }
  } catch (error) {
        console.error("Erro ao verificar o token:", error);
  }
});
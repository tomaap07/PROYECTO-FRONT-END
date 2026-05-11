function cargarComponente(id, archivo) {
    const enSubcarpeta = window.location.pathname.includes("/pages/");
    const ruta = enSubcarpeta ? `../components/${archivo}` : `components/${archivo}`;

    fetch(ruta)
        .then(res => {
            if (!res.ok) throw new Error(`Error ${res.status}`);
            return res.text();
        })
        .then(html => {
            document.getElementById(id).innerHTML = html;
        })
        .catch(err => console.warn("Error al cargar componente:", err));
}

function guardar(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function leer(clave, porDefecto = null) {
    const dato = localStorage.getItem(clave);
    if (dato === null) return porDefecto;
    try { 
        return JSON.parse(dato); 
    } catch { 
        return dato; 
    }
}

function toggleTema() {
    const actual = leer("tema", "claro");
    const nuevo = actual === "claro" ? "oscuro" : "claro";
    guardar("tema", nuevo);
    document.documentElement.setAttribute("data-tema", nuevo);
}

document.addEventListener("DOMContentLoaded", () => {
    cargarComponente("nav-placeholder", "nav.html");
    cargarComponente("footer-placeholder", "footer.html");
    const temaGuardado = leer("tema", "claro");
    document.documentElement.setAttribute("data-tema", temaGuardado);
});
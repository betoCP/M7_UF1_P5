document.addEventListener("DOMContentLoaded", () => {
    fetch('https://raw.githubusercontent.com/betoCP/menu-restaurante/main/data.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");

            // Seleccionamos todos los grupos de platos
            const grupos = Array.from(xml.getElementsByTagName("GRUP"));

            grupos.forEach(grupo => {
                const nombreGrupo = grupo.querySelector("NOM").textContent;

                // Creamos un elemento para el grupo
                const grupoDiv = document.createElement("div");
                grupoDiv.classList.add("GRUP");
                grupoDiv.innerHTML = `<h2>${nombreGrupo}</h2>`;

                // Obtenemos todos los platos dentro del grupo
                const platos = Array.from(grupo.getElementsByTagName("PLAT"));

                platos.forEach(plato => {
                    const nombrePlato = plato.querySelector("NOM").textContent;
                    const descripcionPlato = plato.querySelector("DESCRIPCIO").textContent;
                    const precioPlato = plato.querySelector("PREU").textContent;

                    // Crear el elemento de plato
                    const platoDiv = document.createElement("div");
                    platoDiv.classList.add("PLAT");
                    platoDiv.innerHTML = `
                        <p class="NOM">${nombrePlato}</p>
                        <p class="DESCRIPCIO">${descripcionPlato}</p>
                        <p class="PREU">${precioPlato} €</p>
                    `;

                    // Añadir plato al grupo
                    grupoDiv.appendChild(platoDiv);
                });

                // Añadir grupo al menú
                document.getElementById("menu").appendChild(grupoDiv);
            });
        })
        .catch(error => console.error("Error cargando el XML:", error));
});

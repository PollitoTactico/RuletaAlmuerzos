// Configuración del sistema
const CONFIG = {
    PEOPLE: ['José', 'Cíndel', 'Sebas', 'Felipito', 'Rachel'],
    SCHEDULE_1: '12:00 PM',
    SCHEDULE_2: '1:00 PM',
    MAX_RETRIES: 1000,
    STORAGE_KEY: 'ruletalmuerzos_history',
    // Configuración Supabase
    SUPABASE_URL: 'https://mylmerudkkykhzofoyim.supabase.co',
    SUPABASE_KEY: 'sb_publishable_NbVH8PbTil5QG8XfGgUq3A_DmzbBUDu',
    // Configuración Notion (opcional)
    NOTION_API_KEY: '', // Reemplazar con tu API key
    NOTION_DATABASE_ID: '' // Reemplazar con tu database ID
};

const SCHEDULES = {
    week1: {
        schedule1: {
            time: '12:00 PM',
            days: ['Lunes', 'Miércoles', 'Viernes']
        },
        schedule2: {
            time: '1:00 PM',
            days: ['Martes', 'Jueves']
        }
    },
    week2: {
        schedule1: {
            time: '1:00 PM',
            days: ['Martes', 'Jueves']
        },
        schedule2: {
            time: '12:00 PM',
            days: ['Lunes', 'Miércoles', 'Viernes']
        }
    }
};

// Variables globales
let history = [];
let currentWeekNumber = 1;

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    setupEventListeners();
    updateHistoryDisplay();
});

// Configurar eventos
function setupEventListeners() {
    document.getElementById('generateBtn').addEventListener('click', generateWeek);
    document.getElementById('historyBtn').addEventListener('click', showHistoryModal);
    document.getElementById('resetBtn').addEventListener('click', resetHistory);
    document.getElementById('deleteHistoryBtn').addEventListener('click', deleteSupabaseHistory);
    
    // Cerrar modal
    const modal = document.getElementById('historyModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('historyModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Generar una semana
function generateWeek() {
    const messageEl = document.getElementById('message');
    messageEl.className = 'message';
    messageEl.textContent = '';

    // Determinar si es semana 1 o 2 basado en el historial
    const weekType = getCurrentWeekType();
    
    // Generar combinación válida
    let attempt = 0;
    let combination = null;

    while (attempt < CONFIG.MAX_RETRIES) {
        combination = generateRandomCombination();
        
        if (!isCombinationUsed(combination)) {
            break;
        }
        
        attempt++;
    }

    if (attempt === CONFIG.MAX_RETRIES) {
        messageEl.className = 'message warning';
        messageEl.textContent = '⚠️ Ya no hay combinaciones posibles. Considera reiniciar el historial.';
        document.getElementById('results').style.display = 'none';
        return;
    }

    // Guardar en el historial
    const historyEntry = {
        date: new Date().toLocaleDateString('es-ES'),
        weekNumber: currentWeekNumber,
        weekType: weekType,
        group1: combination.group1,
        group2: combination.group2
    };

    history.push(historyEntry);
    saveHistory();
    currentWeekNumber = currentWeekNumber === 1 ? 2 : 1;

    // Mostrar resultados
    displayResults(combination, weekType, historyEntry.date);
    updateHistoryDisplay();

    messageEl.className = 'message success';
    messageEl.textContent = '✅ ¡Combinación generada!';
    
    // Guardar en Supabase y Notion
    saveToSupabase(combination, weekType);
    saveToNotion(combination, weekType);
}

// Guardar en Notion
async function saveToNotion(combination, weekType) {
    if (!CONFIG.NOTION_API_KEY || !CONFIG.NOTION_DATABASE_ID) {
        console.log('Notion no configurado');
        return;
    }

    const scheduleData = SCHEDULES[weekType];

    try {
        const response = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CONFIG.NOTION_API_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parent: {
                    database_id: CONFIG.NOTION_DATABASE_ID
                },
                properties: {
                    'Name': {
                        title: [{
                            text: {
                                content: `Período ${currentWeekNumber} - ${new Date().toLocaleDateString('es-ES')}`
                            }
                        }]
                    },
                    'Fecha': {
                        date: {
                            start: new Date().toISOString().split('T')[0]
                        }
                    },
                    'Periodo': {
                        number: currentWeekNumber
                    },
                    'Grupo 3': {
                        multi_select: combination.group1.map(p => ({ name: p }))
                    },
                    'Grupo 2': {
                        multi_select: combination.group2.map(p => ({ name: p }))
                    },
                    'Horario Grupo 3': {
                        rich_text: [{
                            text: { content: scheduleData.schedule1.time }
                        }]
                    },
                    'Horario Grupo 2': {
                        rich_text: [{
                            text: { content: scheduleData.schedule2.time }
                        }]
                    },
                    'Días Grupo 3': {
                        multi_select: scheduleData.schedule1.days.map(d => ({ name: d }))
                    },
                    'Días Grupo 2': {
                        multi_select: scheduleData.schedule2.days.map(d => ({ name: d }))
                    }
                }
            })
        });

        if (response.ok) {
            console.log('✅ Guardado en Notion');
        }
    } catch (error) {
        console.log('Error Notion:', error);
    }
}

// Generar una combinación aleatoria
function generateRandomCombination() {
    // Generar todas las combinaciones posibles de 3 personas
    const combinations3 = [];
    
    for (let i = 0; i < CONFIG.PEOPLE.length; i++) {
        for (let j = i + 1; j < CONFIG.PEOPLE.length; j++) {
            for (let k = j + 1; k < CONFIG.PEOPLE.length; k++) {
                combinations3.push([CONFIG.PEOPLE[i], CONFIG.PEOPLE[j], CONFIG.PEOPLE[k]]);
            }
        }
    }
    
    console.log(`Total combinaciones posibles: ${combinations3.length}`);
    
    // Filtrar las que ya no han sido usadas
    const availableCombinations = combinations3.filter(combo => {
        const used = history.some(entry => 
            arraysEqual(combo.sort(), entry.group1.sort())
        );
        return !used;
    });
    
    console.log(`Combinaciones disponibles: ${availableCombinations.length}`);
    
    if (availableCombinations.length === 0) {
        return null; // No hay más combinaciones disponibles
    }
    
    // Elegir aleatoriamente una combinación de 3
    const group1 = availableCombinations[Math.floor(Math.random() * availableCombinations.length)];
    
    // Las 2 personas restantes forman el grupo de 2
    const group2 = CONFIG.PEOPLE.filter(p => !group1.includes(p));
    
    // Verificar que el grupo de 2 también no haya sido usado
    const group2Used = history.some(entry => 
        arraysEqual(group2.sort(), entry.group2.sort())
    );
    
    return {
        group1: group1,
        group2: group2,
        group2Used: group2Used
    };
}

// Verificar si una combinación ya fue usada
function isCombinationUsed(combination) {
    if (!combination) return true; // Si es null, ya no hay combinaciones
    
    // Verificar grupos de 3
    const group1Used = history.some(entry => 
        arraysEqual(combination.group1.sort(), entry.group1.sort())
    );
    
    // Verificar grupos de 2
    const group2Used = history.some(entry => 
        arraysEqual(combination.group2.sort(), entry.group2.sort())
    );

    return group1Used || group2Used;
}

// Comparar arrays
function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, idx) => val === b[idx]);
}

// Obtener el tipo de semana actual
function getCurrentWeekType() {
    return currentWeekNumber === 1 ? 'week1' : 'week2';
}

// Mostrar resultados
function displayResults(combination, weekType, date) {
    const resultsEl = document.getElementById('results');
    const weekTitle = document.getElementById('weekTitle');
    const weekNumber = document.getElementById('weekNumber');
    const weekDescription = document.getElementById('weekDescription');
    
    const scheduleData = SCHEDULES[weekType];
    
    // Determinar cuál grupo es de 3 y cuál de 2
    // El grupo de 3 siempre será asignado al schedule 1 de la semana actual
    const group1Schedule = scheduleData.schedule1;
    const group2Schedule = scheduleData.schedule2;

    weekTitle.textContent = `Generada: ${date}`;
    weekNumber.textContent = currentWeekNumber;
    
    let description = `Este período dura 2 semanas. `;
    if (currentWeekNumber === 1) {
        description += `Semana 1: Grupo 3 come a las 12:00 PM (L, M, V). Semana 2: Intercambian días y horarios.`;
    } else {
        description += `Período anterior finaliza. Nuevos grupos inician en Semana 1.`;
    }
    weekDescription.textContent = description;

    // Grupo de 3
    const group3El = document.getElementById('group3Members');
    const schedule3El = document.getElementById('schedule3');
    const scheduleDetails3El = document.getElementById('scheduleDetails3');
    
    group3El.innerHTML = combination.group1
        .map(person => `<li>${person}</li>`)
        .join('');
    
    schedule3El.textContent = group3Schedule.time;
    scheduleDetails3El.innerHTML = `
        <strong>Horario:</strong> ${group3Schedule.time}<br>
        <strong>Días:</strong> ${group3Schedule.days.join(', ')}
    `;

    // Grupo de 2
    const group2El = document.getElementById('group2Members');
    const schedule2El = document.getElementById('schedule2');
    const scheduleDetails2El = document.getElementById('scheduleDetails2');
    
    group2El.innerHTML = combination.group2
        .map(person => `<li>${person}</li>`)
        .join('');
    
    schedule2El.textContent = group2Schedule.time;
    scheduleDetails2El.innerHTML = `
        <strong>Horario:</strong> ${group2Schedule.time}<br>
        <strong>Días:</strong> ${group2Schedule.days.join(', ')}
    `;

    resultsEl.style.display = 'block';
    resultsEl.scrollIntoView({ behavior: 'smooth' });
}

// Guardar historial en localStorage
function saveHistory() {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(history));
}

// Cargar historial desde localStorage
function loadHistory() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (stored) {
        history = JSON.parse(stored);
    }
    
    // Determinar el número de semana actual basado en el historial
    if (history.length > 0) {
        // Si el último entry fue semana 1, próxima es semana 2, etc.
        const lastEntry = history[history.length - 1];
        currentWeekNumber = lastEntry.weekNumber === 1 ? 2 : 1;
    } else {
        currentWeekNumber = 1;
    }
}

// Actualizar vista del historial
function updateHistoryDisplay() {
    const historyListEl = document.getElementById('historyList');
    
    if (history.length === 0) {
        historyListEl.innerHTML = '<p class="empty-message">No hay historial aún</p>';
        return;
    }

    historyListEl.innerHTML = history
        .map((entry, idx) => {
            const weekClass = entry.weekType === 'week2' ? 'week-2' : '';
            return `
                <div class="history-item ${weekClass}">
                    <div>
                        <strong>Combinación ${idx + 1}:</strong><br>
                        Período ${entry.weekNumber} - Grupo de 3: ${entry.group1.join(', ')} | Grupo de 2: ${entry.group2.join(', ')}
                        <div class="history-date">${entry.date}</div>
                    </div>
                </div>
            `;
        })
        .join('');
}

// Reiniciar historial
function resetHistory() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    history = [];
    currentWeekNumber = 1;
    updateHistoryDisplay();
    
    document.getElementById('results').style.display = 'none';
    
    const messageEl = document.getElementById('message');
    messageEl.className = 'message success';
    messageEl.textContent = '✅ Historial reiniciado';
    
    setTimeout(() => {
        messageEl.textContent = '';
        messageEl.className = 'message';
    }, 3000);
}

// Guardar en Supabase
async function saveToSupabase(combination, weekType) {
    if (!CONFIG.SUPABASE_URL || CONFIG.SUPABASE_URL === 'https://your-project.supabase.co') {
        console.log('⚠️ Supabase no configurado');
        return;
    }

    const scheduleData = SCHEDULES[weekType];

    try {
        console.log('Enviando a Supabase...', {
            week_number: currentWeekNumber,
            group_1: combination.group1,
            group_2: combination.group2
        });

        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/roulette_history`, {
            method: 'POST',
            headers: {
                'apikey': CONFIG.SUPABASE_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                week_number: currentWeekNumber,
                group_1: combination.group1,
                group_2: combination.group2,
                schedule_3: scheduleData.schedule1.time,
                schedule_2: scheduleData.schedule2.time,
                days_3: scheduleData.schedule1.days,
                days_2: scheduleData.schedule2.days
            })
        });

        console.log('Response Supabase:', response.status, response.statusText);
        const data = await response.text();
        console.log('Data:', data);

        if (response.ok) {
            console.log('✅ Guardado en Supabase');
        } else {
            console.log('❌ Error al guardar:', data);
        }
    } catch (error) {
        console.log('Error Supabase:', error);
    }
}

// Mostrar modal con historial de Supabase
async function showHistoryModal() {
    const modal = document.getElementById('historyModal');
    const historyList = document.getElementById('modalHistoryList');
    
    modal.style.display = 'block';
    historyList.innerHTML = '<p class="loading">Cargando historial...</p>';

    if (!CONFIG.SUPABASE_URL || CONFIG.SUPABASE_URL === 'https://your-project.supabase.co') {
        historyList.innerHTML = `
            <p class="empty-message">
                ⚠️ Supabase no está configurado.<br>
                Mostrar historial local en su lugar.
            </p>
            ${getLocalHistoryHTML()}
        `;
        return;
    }

    try {
        const response = await fetch(
            `${CONFIG.SUPABASE_URL}/rest/v1/roulette_history?order=created_at.desc`,
            {
                method: 'GET',
                headers: {
                    'apikey': CONFIG.SUPABASE_KEY,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            }
        );

        if (!response.ok) {
            historyList.innerHTML = getLocalHistoryHTML();
            return;
        }

        const data = await response.json();
        console.log('Datos de Supabase:', data.length, 'registros');

        if (!data || data.length === 0) {
            historyList.innerHTML = '<p class="empty-message">📭 No hay historial</p>';
            return;
        }

        historyList.innerHTML = data.map((entry, idx) => `
            <div class="history-item">
                <div>
                    <strong>📅 Período ${entry.week_number} - ${new Date(entry.created_at).toLocaleDateString('es-ES')}</strong><br>
                    <strong>Grupo de 3:</strong> ${entry.group_1.join(', ')}<br>
                    <span style="color: #666; font-size: 0.9em;">
                        ${entry.schedule_3} - ${entry.days_3.join(', ')}
                    </span><br>
                    <strong>Grupo de 2:</strong> ${entry.group_2.join(', ')}<br>
                    <span style="color: #666; font-size: 0.9em;">
                        ${entry.schedule_2} - ${entry.days_2.join(', ')}
                    </span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        historyList.innerHTML = getLocalHistoryHTML();
    }
}

// Obtener historial local en formato HTML
function getLocalHistoryHTML() {
    if (history.length === 0) {
        return '<p class="empty-message">📭 No hay historial</p>';
    }

    return history.map((entry, idx) => `
        <div class="history-item">
            <div>
                <strong>📅 Período ${entry.weekNumber} - ${entry.date}</strong><br>
                <strong>Grupo de 3:</strong> ${entry.group1.join(', ')}<br>
                <strong>Grupo de 2:</strong> ${entry.group2.join(', ')}
            </div>
        </div>
    `).join('');
}
// Borrar historial de Supabase
async function deleteSupabaseHistory() {
    console.log('Iniciando borrado de historial...');
    
    // Borrar localStorage
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    history = [];
    currentWeekNumber = 1;
    console.log('✅ localStorage borrado');
    
    // Intentar borrar de Supabase
    if (CONFIG.SUPABASE_URL && CONFIG.SUPABASE_URL !== 'https://your-project.supabase.co') {
        try {
            console.log('Obteniendo registros...');
            
            // Paso 1: Obtener todos los IDs
            const getResponse = await fetch(
                `${CONFIG.SUPABASE_URL}/rest/v1/roulette_history?select=id`,
                {
                    method: 'GET',
                    headers: {
                        'apikey': CONFIG.SUPABASE_KEY,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('GET response:', getResponse.status);
            
            if (getResponse.ok) {
                const records = await getResponse.json();
                console.log(`Encontrados ${records.length} registros para borrar`);
                
                // Paso 2: Borrar cada registro por ID
                for (let record of records) {
                    console.log(`Borrando ID: ${record.id}`);
                    const delResp = await fetch(
                        `${CONFIG.SUPABASE_URL}/rest/v1/roulette_history?id=eq.${record.id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'apikey': CONFIG.SUPABASE_KEY,
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    console.log(`Borrado ID ${record.id}: ${delResp.status} ${delResp.statusText}`);
                }
                console.log('✅ Todos los registros borrados');
            } else {
                console.log('❌ Error al obtener registros:', getResponse.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    // Mostrar modal vacío
    const historyList = document.getElementById('modalHistoryList');
    historyList.innerHTML = '<p class="empty-message">✅ Historial borrado</p>';
    
    // Recargar después de 1.5 segundos
    setTimeout(() => {
        location.reload();
    }, 1500);
}
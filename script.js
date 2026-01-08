// Configuración del sistema
const CONFIG = {
    PEOPLE: ['José', 'Cíndel', 'Sebas', 'Felipito', 'Rachel'],
    SCHEDULE_1: '12:00 PM',
    SCHEDULE_2: '1:00 PM',
    MAX_RETRIES: 1000,
    STORAGE_KEY: 'ruletalmuerzos_history',
    // Configuración Supabase
    SUPABASE_URL: 'https://mylmerudkkykhzofoyim.supabase.co',
    SUPABASE_KEY: 'sb_publishable_NbVH8PbTil5QG8XfGgUq3A_DmzbBUDu'
};

const SCHEDULES = {
    week1: {
        schedule1: {
            time: '12:00 PM',
            days: ['Lunes', 'Miércoles', 'Jueves']
        },
        schedule2: {
            time: '1:00 PM',
            days: ['Martes', 'Viernes']
        }
    },
    week2: {
        schedule1: {
            time: '1:00 PM',
            days: ['Lunes', 'Miércoles', 'Jueves']
        },
        schedule2: {
            time: '12:00 PM',
            days: ['Martes', 'Viernes']
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
        group3: combination.group3,
        group2: combination.group2
    };

    history.push(historyEntry);
    saveHistory();
    currentWeekNumber = currentWeekNumber === 1 ? 2 : 1;

    // Mostrar resultados
    displayResults(combination, weekType, historyEntry.date);
    updateHistoryDisplay();

    messageEl.className = 'message success';
    messageEl.textContent = '✅ ¡Combinación generada exitosamente!';
    
    // Guardar en Supabase
    saveToSupabase(combination, weekType);
}

// Generar una combinación aleatoria
function generateRandomCombination() {
    const shuffled = [...CONFIG.PEOPLE].sort(() => Math.random() - 0.5);
    return {
        group3: shuffled.slice(0, 3),
        group2: shuffled.slice(3, 5)
    };
}

// Verificar si una combinación ya fue usada
function isCombinationUsed(combination) {
    return history.some(entry => {
        // Verificar grupos de 3
        const group3Used = arraysEqual(
            combination.group3.sort(),
            entry.group3.sort()
        );
        
        // Verificar grupos de 2
        const group2Used = arraysEqual(
            combination.group2.sort(),
            entry.group2.sort()
        );

        return group3Used || group2Used;
    });
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
    const group3Schedule = scheduleData.schedule1;
    const group2Schedule = scheduleData.schedule2;

    weekTitle.textContent = `Generada: ${date}`;
    weekNumber.textContent = currentWeekNumber;
    
    let description = `Los grupos se mantendrán durante 2 semanas. `;
    if (currentWeekNumber === 1) {
        description += `En el próximo periodo intercambiarán horarios.`;
    } else {
        description += `Este es el último periodo antes de nuevas combinaciones.`;
    }
    weekDescription.textContent = description;

    // Grupo de 3
    const group3El = document.getElementById('group3Members');
    const schedule3El = document.getElementById('schedule3');
    const scheduleDetails3El = document.getElementById('scheduleDetails3');
    
    group3El.innerHTML = combination.group3
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
                        Semana ${entry.weekNumber} - Grupo de 3: ${entry.group3.join(', ')} | Grupo de 2: ${entry.group2.join(', ')}
                        <div class="history-date">${entry.date}</div>
                    </div>
                </div>
            `;
        })
        .join('');
}

// Reiniciar historial
function resetHistory() {
    if (confirm('¿Estás seguro de que quieres borrar todo el historial? Esta acción no se puede deshacer.')) {
        localStorage.removeItem(CONFIG.STORAGE_KEY);
        history = [];
        currentWeekNumber = 1;
        updateHistoryDisplay();
        
        document.getElementById('results').style.display = 'none';
        
        const messageEl = document.getElementById('message');
        messageEl.className = 'message success';
        messageEl.textContent = '✅ Historial reiniciado correctamente';
        
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'message';
        }, 3000);
    }
}

// Guardar en Supabase
async function saveToSupabase(combination, weekType) {
    if (!CONFIG.SUPABASE_URL || CONFIG.SUPABASE_URL === 'https://your-project.supabase.co') {
        console.log('⚠️ Supabase no configurado. Los datos se guardan solo localmente.');
        return;
    }

    const scheduleData = SCHEDULES[weekType];

    try {
        const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/roulette_history`, {
            method: 'POST',
            headers: {
                'apikey': CONFIG.SUPABASE_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                week_number: currentWeekNumber,
                group_3: combination.group3,
                group_2: combination.group2,
                schedule_3: scheduleData.schedule1.time,
                schedule_2: scheduleData.schedule2.time,
                days_3: scheduleData.schedule1.days,
                days_2: scheduleData.schedule2.days
            })
        });

        if (response.ok) {
            console.log('✅ Guardado en Supabase');
        } else {
            console.log('Nota: Supabase no disponible, datos guardados localmente');
        }
    } catch (error) {
        console.log('Datos guardados localmente (Supabase no disponible)');
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
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            historyList.innerHTML = getLocalHistoryHTML();
            return;
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            historyList.innerHTML = '<p class="empty-message">📭 No hay historial aún</p>';
            return;
        }

        historyList.innerHTML = data.map((entry, idx) => `
            <div class="history-item">
                <div>
                    <strong>📅 Periodo ${entry.week_number} - ${new Date(entry.created_at).toLocaleDateString('es-ES')}</strong><br>
                    <strong>Grupo de 3:</strong> ${entry.group_3.join(', ')}<br>
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
                <strong>📅 Periodo ${entry.weekNumber} - ${entry.date}</strong><br>
                <strong>Grupo de 3:</strong> ${entry.group3.join(', ')}<br>
                <strong>Grupo de 2:</strong> ${entry.group2.join(', ')}
            </div>
        </div>
    `).join('');
}

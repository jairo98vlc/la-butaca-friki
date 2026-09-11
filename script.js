// script.js
let currentSection = 'peliculas';
let updateTimer = null;

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    currentSection = sectionId;
    
    if (sectionId === 'peliculas') loadPeliculas();
    else if (sectionId === 'series') loadSeries();
    else if (sectionId === 'novedades') loadNovedades();
    else if (sectionId === 'plataformas') loadPlataformas();
}

function showLoading(show) {
    document.getElementById('loading').classList.toggle('active', show);
}

async function fetchTMDB(endpoint) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=es-ES`);
        if (!response.ok) throw new Error('Error TMDB');
        return await response.json();
    } catch (error) {
        console.error('TMDB Error:', error);
        return null;
    }
}

async function fetchTVmaze(endpoint) {
    try {
        const response = await fetch(`${TVMAZE_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error('Error TVmaze');
        return await response.json();
    } catch (error) {
        console.error('TVMaze Error:', error);
        return null;
    }
}

async function getWatchProviders(id, type) {
    const data = await fetchTMDB(`/${type}/${id}/watch_providers`);
    if (data && data.results && data.results.ES) {
        return data.results.ES;
    }
    return null;
}

async function loadPeliculas() {
    showLoading(true);
    const data = await fetchTMDB('/movie/popular');
    
    if (data && data.results) {
        const grid = document.getElementById('peliculas-grid');
        grid.innerHTML = '';
        
        data.results.slice(0, 20).forEach(async movie => {
            if (movie.poster_path) {
                const card = await createMediaCardWithProviders(movie, 'movie');
                grid.appendChild(card);
            }
        });
    }
    
    showLoading(false);
}

async function loadSeries() {
    showLoading(true);
    
    const tmdbData = await fetchTMDB('/tv/popular');
    const tvmazeData = await fetchTVmaze('/search/show?q=popular');
    
    const grid = document.getElementById('series-grid');
    grid.innerHTML = '';
    
    if (tmdbData && tmdbData.results) {
        tmdbData.results.slice(0, 15).forEach(async series => {
            if (series.poster_path) {
                const card = await createMediaCardWithProviders(series, 'tv');
                grid.appendChild(card);
            }
        });
    }
    
    if (tvmazeData && tvmazeData.length > 0) {
        tvmazeData.slice(0, 5).forEach(show => {
            if (show.show.image) {
                const card = createTVmazeCard(show.show);
                grid.appendChild(card);
            }
        });
    }
    
    showLoading(false);
}

async function loadNovedades() {
    showLoading(true);
    const data = await fetchTMDB('/movie/upcoming');
    
    if (data && data.results) {
        const grid = document.getElementById('novedades-grid');
        grid.innerHTML = '';
        
        data.results.slice(0, 20).forEach(async movie => {
            if (movie.poster_path) {
                const card = await createMediaCardWithProviders(movie, 'movie', true);
                grid.appendChild(card);
            }
        });
    }
    
    showLoading(false);
}

async function loadPlataformas() {
    showLoading(true);
    
    const providers = await fetchTMDB('/watch/providers/movie');
    
    if (providers && providers.results) {
        const list = document.getElementById('plataformas-list');
        list.innerHTML = '';
        
        const plataformasPrincipales = ['Netflix', 'Disney Plus', 'HBO Max', 'Amazon Prime Video', 'Apple TV Plus', 'Paramount Plus'];
        
        providers.results
            .filter(p => plataformasPrincipales.some(nombre => 
                p.provider_name.toLowerCase().includes(nombre.toLowerCase())
            ))
            .forEach(provider => {
                const card = document.createElement('div');
                card.className = 'platform-card';
                card.innerHTML = `
                    <h3>${provider.provider_name}</h3>
                    <img src="${IMAGE_BASE_URL}${provider.logo_path}" alt="${provider.provider_name}">
                    <p>Disponible en Espa&ntilde;a</p>
                `;
                list.appendChild(card);
            });
    }
    
    showLoading(false);
}

async function createMediaCardWithProviders(item, type, isUpcoming = false) {
    const card = document.createElement('div');
    card.className = 'media-card';
    
    const title = type === 'movie' ? item.title : item.name;
    const date = type === 'movie' ? item.release_date : item.first_air_date;
    const year = date ? new Date(date).getFullYear() : 'N/A';
    
    const providers = await getWatchProviders(item.id, type);
    let providerBadges = '';
    
    if (providers && providers.flatrate) {
        providerBadges = providers.flatrate.slice(0, 3).map(p => 
            `<span class="platform-badge" title="${p.provider_name}">${p.provider_name}</span>`
        ).join('');
    }
    
    card.innerHTML = `
        <img src="${IMAGE_BASE_URL}${item.poster_path}" alt="${title}" loading="lazy">
        <div class="media-card-info">
            <div class="media-card-title">${title}</div>
            <div class="media-card-meta">
                ${year} ${isUpcoming ? '🆕' : ''}
            </div>
            <div class="media-card-providers" style="margin-top:0.5rem;">
                ${providerBadges}
            </div>
        </div>
    `;
    
    card.onclick = () => showDetails(item.id, type);
    return card;
}

function createTVmazeCard(show) {
    const card = document.createElement('div');
    card.className = 'media-card';
    
    const year = show.premiered ? new Date(show.premiered).getFullYear() : 'N/A';
    
    card.innerHTML = `
        <img src="${show.image.medium}" alt="${show.name}" loading="lazy">
        <div class="media-card-info">
            <div class="media-card-title">${show.name}</div>
            <div class="media-card-meta">${year} • TVmaze</div>
        </div>
    `;
    
    return card;
}

function showDetails(id, type) {
    alert(`Detalles de ${type} ID ${id}\n\nAquí»ı puedes implementar un modal o página de detalles.`);
}

function startAutoUpdate() {
    if (updateTimer) clearInterval(updateTimer);
    
    updateTimer = setInterval(() => {
        console.log('Actualizando datos...');
        if (currentSection === 'peliculas') loadPeliculas();
        else if (currentSection === 'series') loadSeries();
        else if (currentSection === 'novedades') loadNovedades();
    }, UPDATE_INTERVAL);
}

document.addEventListener('DOMContentLoaded', () => {
    loadPeliculas();
    startAutoUpdate();
});
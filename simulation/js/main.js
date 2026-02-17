// Parameter Selection State
let selectedParameters = {
    material: null,
    friction: null,
    velocity: null,
    temperature: null
};

// Mode Selection Function
function selectMode(mode) {
    if (mode === 'bench') {
        window.location.href = 'bench-setup.html';
    }
}

// Show Applications Modal
function showApplicationsModal() {
    const modal = document.getElementById('applications-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close Applications Modal
function closeApplicationsModal() {
    const modal = document.getElementById('applications-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Select Application from Modal
function selectApplication(appType) {
    window.location.href = `app-${appType}.html`;
}

// Parameter Selection Function
function selectParameter(paramType, value, button) {
    // Update state
    selectedParameters[paramType] = value;
    
    // Update UI - remove selected class from siblings
    const siblings = button.parentElement.querySelectorAll('.param-button');
    siblings.forEach(btn => btn.classList.remove('selected'));
    
    // Add selected class to clicked button
    button.classList.add('selected');
    
    // Update summary display
    updateSummary();
    
    // Check if all parameters are selected
    checkAllParametersSelected();
}

// Update Summary Display
function updateSummary() {
    document.getElementById('selected-material').textContent = 
        selectedParameters.material || 'Not selected';
    document.getElementById('selected-friction').textContent = 
        selectedParameters.friction || 'Not selected';
    document.getElementById('selected-velocity').textContent = 
        selectedParameters.velocity || 'Not selected';
    document.getElementById('selected-temperature').textContent = 
        selectedParameters.temperature || 'Not selected';
}

// Check if All Parameters Selected
function checkAllParametersSelected() {
    const allSelected = selectedParameters.material && 
                       selectedParameters.friction && 
                       selectedParameters.velocity &&
                       selectedParameters.temperature;
    
    const runButton = document.getElementById('run-btn');
    if (runButton) {
        runButton.disabled = !allSelected;
    }
}

// Map Parameters to Video File (matching original PHP logic)
function getVideoFileName() {
    // Material mapping
    const materialMap = {
        'Aluminium': 'al',
        'Copper': 'cu',
        'Ck-45 Steel': 'CK45'
    };
    
    // Friction mapping
    const frictionMap = {
        'Low': 'f0',
        'Medium': 'fm',
        'High': 'fh'
    };
    
    // Velocity mapping
    const velocityMap = {
        '0.5 mm/sec': 'vp5',
        '1 mm/sec': 'v1',
        '1.5 mm/sec': 'v1p5'
    };
    
    const material = materialMap[selectedParameters.material];
    const friction = frictionMap[selectedParameters.friction];
    const velocity = velocityMap[selectedParameters.velocity];
    const temp = selectedParameters.temperature;
    
    // Construct folder and filename based on original PHP pattern
    const folder = material.charAt(0).toUpperCase() + material.slice(1) + '_' + temp;
    const filename = `Rolling_${material}_${friction}_${velocity}.mp4`;
    
    return {
        folder: folder,
        filename: filename,
        fullPath: `ROLLING/${folder}/${filename}`
    };
}

// Get description based on parameters (from original PHP $_SESSION['speech'])
function getSimulationDescription() {
    const material = selectedParameters.material;
    const friction = selectedParameters.friction;
    const velocity = selectedParameters.velocity;
    const temp = selectedParameters.temperature;
    
    let materialText = material;
    if (material === 'Ck-45 Steel') {
        materialText = 'Steel(C-45)';
    }
    
    let frictionText = friction.toLowerCase();
    if (friction === 'Low') {
        frictionText = 'zero';
    }
    
    let velocityText = velocity.replace(' mm/sec', '');
    
    return `The video shows the rolling operation taking place using three different set of rollers. The slabs of ${materialText} ${temp === 'Cold' ? 'is taken cold (cold rolling)' : 'are taken hot (hot rolling)'}. ${friction} friction between rollers and slabs is shown on the top end in the video. The roller sets are rotating with the ${velocityText} r.p.m. speed with lower rollers moving clockwise and vice versa. On the right hand side one could see two graph of forging force evaluation on lower and upper roller respectively vs. step during rolling process. The scale on left hand side describes the equivalent strain in slab changing during the process.`;
}

// Check if video file exists
async function checkVideoAvailability(videoPath) {
    try {
        const response = await fetch(videoPath, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Run Simulation
async function runSimulation() {
    const videoInfo = getVideoFileName();
    const description = getSimulationDescription();
    
    // Check if video exists before redirecting
    const videoExists = await checkVideoAvailability(videoInfo.fullPath);
    
    // If video doesn't exist, silently fail (do nothing)
    // This makes it look like a network issue to the user
    if (!videoExists) {
        return; // Do nothing, user stays on current page
    }
    
    // Store parameters in localStorage for simulation page
    localStorage.setItem('simulationParams', JSON.stringify({
        material: selectedParameters.material,
        friction: selectedParameters.friction,
        velocity: selectedParameters.velocity,
        temperature: selectedParameters.temperature,
        videoPath: videoInfo.fullPath,
        description: description
    }));
    
    // Navigate to simulation result page
    window.location.href = 'bench-result.html';
}

// Page Load Handler
document.addEventListener('DOMContentLoaded', function() {
    // Update active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
import './styles.css'

async function getData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=X2CNSMUNBY8RYHUJ9NR6TQU6B&contentType=json`)

    const data = await response.json()

    return data
}

function init() {
    const btnLocation = document.querySelector('.btnLocation')
    const inputLocation = document.querySelector('#location')
    const form = document.querySelector('form')

    btnLocation.addEventListener('click', async (e) => {
        e.preventDefault()
        
        const location = inputLocation.value.trim()
        clearError()

        if (!location) {
            handleError('Please enter a valid location.');
            return;
        }

        try {
            const dataObtained = await getData(location)
            displayInfo(dataObtained)
        } catch (error) {
            handleError(`Could not obtain data. Try again.`);
        }

        form.reset()
    })
}

function displayInfo(dataObtained) {
    const data = document.querySelector('.data')

    data.innerHTML = ''

    const p = document.createElement('p')
    
    p.innerHTML = `<span>${dataObtained.currentConditions.conditions}</span><br>${dataObtained.resolvedAddress}`

    const info = document.createElement('div')
    info.classList.add('info')

    const degrees = document.createElement('p')
    degrees.classList.add('degrees')
    degrees.innerText = dataObtained.currentConditions.temp

    info.appendChild(degrees)

    data.append(p, info)
}

function handleError(message) {
    const error = document.querySelector('.error')
    error.innerHTML = message
    error.style.display = 'block';
}

function clearError() {
    const error = document.querySelector('.error');
    error.innerHTML = '';
    error.style.display = 'none';
}

init()
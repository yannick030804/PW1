const origen = document.getElementById("origin")
const destino = document.getElementById("destination")
const startDate = document.getElementById("start-date")
const endDate = document.getElementById("end-date")
const formSubmitted = document.getElementById("new-trip-form")
const submitBtn = document.getElementById("submit-button")

const error = document.getElementById("show-error")

let trips = JSON.parse(localStorage.getItem("tp_trips")) || []

function getRandomPrice() {
    return Math.floor(Math.random() * 500) + 200
}

formSubmitted.addEventListener("submit", function (e) {
    e.preventDefault()
    error.style.color = "black"
    error.textContent = ""

    if (startDate.value > endDate.value) {
        error.style.color = "#ba1e1e" 
        error.textContent = "¡Fechas inválidas! La fecha de vuelta debe ser posterior o igual a la fecha de ida."
    } else {
        const price = getRandomPrice()

        const newTrip = {
            id: Date.now(),
            origin: origen.value,
            destination: destino.value,
            startDate: startDate.value,
            endDate: endDate.value,
            price: price
        }

        trips.push(newTrip)

        localStorage.setItem("tp_trips", JSON.stringify(trips))

        submitBtn.textContent = "Cargando..."
        error.textContent = "Buscando vuelo..."
        submitBtn.style.backgroundColor = "rgb(162, 164, 166)"
        submitBtn.disabled = true;

        setTimeout(() => {
        formSubmitted.reset()
        submitBtn.disabled = false
        submitBtn.textContent = "Guardar"
        submitBtn.style.backgroundColor = "#ba1e1e"
        }, 2000)
        
        window.location.href = "trips.html"
    }
})
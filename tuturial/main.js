const strengthMeter = document.querySelector(".strength-meter")
const passwordInput = document.querySelector(".password")
const reasonsContainer = document.querySelector(".reasons")

passwordInput.addEventListener("input", updateStrengthMeter)

updateStrengthMeter()

function updateStrengthMeter() {
    const weaknesses = calculatePasswordStrength(passwordInput.value)

    console.log(weaknesses)

    let strength = 100

    // reasonsContainer.innerHTML = ""
    weaknesses.forEach((w) => {
        if (!w) return
        strength -= w.deduction
        // const reason = document.createElement("div")
        // reason.innerText = w.message
        // reasonsContainer.appendChild(reason)
    })

    strengthMeter.style.setProperty("--strength", strength)
}

function calculatePasswordStrength(password) {
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowercaseWeakness(password))
    weaknesses.push(uppercaseWeakness(password))
    weaknesses.push(numberCaseWeakness(password))
    weaknesses.push(specialCaseWeakness(password))
    weaknesses.push(repeatedCaseWeakness(password))
    return weaknesses
}

function lengthWeakness(password) {
    const length = password.length

    if (length <= 5) {
        return {
            message: "Password is too short",
            deduction: 40,
        }
    }
    if (length <= 10) {
        return {
            message: "Password could be longer",
            deduction: 15,
        }
    }
}

function lowercaseWeakness(password) {
    return characterCaseWeakness(password, /[A-Z]/g, "lowercase")
}
function uppercaseWeakness(password) {
    return characterCaseWeakness(password, /[A-Z]/g, "uppercase")
}
function numberCaseWeakness(password) {
    return characterCaseWeakness(password, /[0-9]/g, "number")
}
function specialCaseWeakness(password) {
    return characterCaseWeakness(
        password,
        /[^0-9a-zA-Z\s]/g,
        "special characters",
    )
}

function characterCaseWeakness(password, regex, _case) {
    const matches = password.match(regex) || []

    if (matches.length === 0) {
        return {
            message: `password has no ${_case} characters`,
            deduction: 15,
        }
    }
    if (matches.length <= 1) {
        return {
            message: `password could use more ${_case} characters`,
            deduction: 5,
        }
    }
}

function repeatedCaseWeakness(password) {
    const matches = password.match(/(.)\1/g) || []

    if (!!matches.length) {
        return {
            message: "password has repeated characters",
            deduction: matches.length * 10,
        }
    }
}

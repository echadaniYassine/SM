export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validatePhone = (phone) => {
  return /^[\+]?[0-9\-()\\s]+$/.test(phone)
}

export const validate = (formData, rules) => {
  const errors = {}
  let valid = true

  for (const field in rules) {
    const fieldRules = rules[field]

    for (const rule of fieldRules) {
      let check

      if (typeof rule === 'string') {
        const validator = validationRules[rule]
        check = validator && validator()(formData[field])
      } else if (typeof rule === 'function') {
        check = rule(formData[field])
      }

      if (check !== true) {
        errors[field] = check
        valid = false
        break
      }
    }
  }

  return { valid, errors }
}

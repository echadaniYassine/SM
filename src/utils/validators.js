// utils/validators.js
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validatePhone = (phone) => {
  return /^[\+]?[0-9\-()\\s]+$/.test(phone)
}

// Define validation rules
export const validationRules = {
  required: (message = 'This field is required') => (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return message
    }
    return true
  },
  
  email: (message = 'Please enter a valid email address') => (value) => {
    if (value && !validateEmail(value)) {
      return message
    }
    return true
  },
  
  phone: (message = 'Please enter a valid phone number') => (value) => {
    if (value && !validatePhone(value)) {
      return message
    }
    return true
  },
  
  minLength: (length, message) => (value) => {
    if (value && value.length < length) {
      return message || `Must be at least ${length} characters`
    }
    return true
  },
  
  maxLength: (length, message) => (value) => {
    if (value && value.length > length) {
      return message || `Must be no more than ${length} characters`
    }
    return true
  },
  
  pattern: (regex, message = 'Invalid format') => (value) => {
    if (value && !regex.test(value)) {
      return message
    }
    return true
  },
  
  match: (fieldName, message = 'Fields do not match') => (value, formData) => {
    if (value !== formData[fieldName]) {
      return message
    }
    return true
  }
}

export const validate = (formData, rules) => {
  const errors = {}
  let valid = true

  for (const field in rules) {
    const fieldRules = rules[field]

    for (const rule of fieldRules) {
      let check

      if (typeof rule === 'string') {
        // Handle string rule names like 'required', 'email', etc.
        const validator = validationRules[rule]
        check = validator && validator()(formData[field], formData)
      } else if (typeof rule === 'function') {
        // Handle custom validation functions
        check = rule(formData[field], formData)
      } else if (typeof rule === 'object' && rule.type) {
        // Handle rule objects like { type: 'minLength', value: 8, message: '...' }
        const validator = validationRules[rule.type]
        if (validator) {
          check = validator(rule.value, rule.message)(formData[field], formData)
        }
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